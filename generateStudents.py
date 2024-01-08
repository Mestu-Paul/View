import requests
import json
import random
from faker import Faker
fake = Faker()
# API endpoint
url = 'https://localhost:7181/api/Students/Post'

# Function to generate dummy data
def generate_dummy_data():
    names = ["Alice", "Bob", "Charlie", "David", "Eva"]
    departments = ["Computer Science", "Physics", "Biology", "Mathematics"]
    sessions = [i for i in range(2012,2022)]
    genders = ["Male", "Female"]

    dummy_data = {
        "name": fake.name(),
        "department": random.choice(departments),
        "session": random.choice(sessions),
        "gender": random.choice(genders)
    }
    return dummy_data

# Add 20 dummy data entries
for _ in range(20):
    data = generate_dummy_data()
    headers = {'Content-type': 'application/json'}

    # Make POST request to the API endpoint
    response = requests.post(url, data=json.dumps(data), headers=headers, verify=False)  # Set verify=False to ignore SSL certificate validation for localhost

    if response.status_code == 201:
        print("Data added successfully:", data)
    else:
        print("Failed to add data. Status code:", response.status_code)
