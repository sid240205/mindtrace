import json
import os
from datetime import datetime
from typing import List, Dict, Optional

class ConversationStore:
    def __init__(self, storage_path: str = None, db_session=None, chroma_collection=None):
        if storage_path is None:
            # Resolves to server/data/conversations.json
            base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
            self.storage_path = os.path.join(base_dir, "data", "conversations.json")
        else:
            self.storage_path = storage_path
        
        self.db_session = db_session
        self.chroma_collection = chroma_collection
        self._ensure_storage()

    def _ensure_storage(self):
        """Ensure the storage file and directory exist."""
        directory = os.path.dirname(self.storage_path)
        if directory and not os.path.exists(directory):
            os.makedirs(directory, exist_ok=True)
        
        if not os.path.exists(self.storage_path):
            with open(self.storage_path, 'w') as f:
                json.dump([], f)

    def save_conversation(self, profile_id: str, transcript: str, user_id: int = None, contact_id: int = None) -> Dict:
        """Save a conversation entry to JSON, database, and ChromaDB."""
        entry = {
            "profile_id": profile_id,
            "timestamp": datetime.now().isoformat(),
            "transcript": transcript
        }
        
        # Save to JSON file (backward compatibility)
        conversations = self._load_conversations()
        conversations.append(entry)
        
        with open(self.storage_path, 'w') as f:
            json.dump(conversations, f, indent=2)
        
        # Save to database as Interaction if db_session is available
        interaction_id = None
        if self.db_session and user_id:
            try:
                from app.models import Interaction
                
                db_interaction = Interaction(
                    user_id=user_id,
                    contact_id=contact_id,
                    contact_name=profile_id,
                    summary=transcript[:200] + "..." if len(transcript) > 200 else transcript,
                    full_details=transcript,
                    mood="neutral",
                    timestamp=datetime.now()
                )
                
                self.db_session.add(db_interaction)
                self.db_session.commit()
                self.db_session.refresh(db_interaction)
                interaction_id = db_interaction.id
                
                print(f"Saved conversation to database as interaction {interaction_id}")
            except Exception as e:
                print(f"Error saving conversation to database: {e}")
                self.db_session.rollback()
        
        # Save to ChromaDB if collection is available
        if self.chroma_collection and interaction_id:
            try:
                self.chroma_collection.add(
                    ids=[f"interaction_{interaction_id}"],
                    documents=[transcript],
                    metadatas=[{
                        "type": "conversation",
                        "interaction_id": interaction_id,
                        "user_id": user_id or -1,
                        "contact_id": contact_id or -1,
                        "contact_name": profile_id,
                        "timestamp": entry["timestamp"],
                        "mood": "neutral"
                    }]
                )
                print(f"Saved conversation to ChromaDB with ID interaction_{interaction_id}")
            except Exception as e:
                print(f"Error saving conversation to ChromaDB: {e}")
            
        return entry

    def get_conversations(self, profile_id: Optional[str] = None) -> List[Dict]:
        """Retrieve conversations, optionally filtered by profile_id."""
        conversations = self._load_conversations()
        
        if profile_id:
            return [c for c in conversations if c["profile_id"] == profile_id]
        
        return conversations

    def _load_conversations(self) -> List[Dict]:
        """Load all conversations from storage."""
        try:
            with open(self.storage_path, 'r') as f:
                return json.load(f)
        except (json.JSONDecodeError, FileNotFoundError):
            return []
