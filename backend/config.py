import os

PANTHEON_API_KEY = os.getenv('PANTHEON_API_KEY', '')
PANTHEON_BASE_URL = os.getenv('PANTHEON_BASE_URL', 'https://api.pantheon.io')
# Interval in seconds for sync schedules
PANTHEON_SYNC_INTERVAL = int(os.getenv('PANTHEON_SYNC_INTERVAL', '3600'))
