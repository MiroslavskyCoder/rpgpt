import json
import os

class SettingsController:
    """Controller for user settings"""

    def __init__(self):
        self.settings_file = "user/settings.json"
        self.default_settings = {
            "character_name": "Default Character",
            "character_description": "A generic character.",
            "tags": ["generic", "neutral"],
        }
        self.settings = self.load_settings()

    def load_settings(self):
        """Load settings from file"""
        if not os.path.exists(self.settings_file):
            return self.default_settings
        with open(self.settings_file) as f:
            return json.load(f)

    def save_settings(self):
        """Save settings to file"""
        with open(self.settings_file, "w") as f:
            json.dump(self.settings, f)

    def get_setting(self, key):
        """Get a setting by key"""
        return self.settings.get(key)

    def set_setting(self, key, value):
        """Set a setting by key"""
        self.settings[key] = value
        self.save_settings()
