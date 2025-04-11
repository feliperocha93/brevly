if [ ! -f .env ]; then
  echo "Creating .env file from example..."
  cp .env.example .env
  echo "Done! Please update .env with your actual credentials."
fi
