#!/usr/bin/env python3
"""
a Python script that provides some stats about Nginx logs stored in MongoDB
"""
from pymongo import MongoClient

if __name__ == "__main__":
    client = MongoClient('mongodb://127.0.0.1:27017')  # Connect to MongoDB
    nginx_collection = client.logs.nginx  # Access the 'nginx' collection within the 'logs' database
    
    # Get the total number of logs in the collection
    total_logs = nginx_collection.count_documents({})
    print(f"{total_logs} logs\nMethods:")

    methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    
    # Loop through each HTTP method and count the documents
    for m in methods:
        method_count = nginx_collection.count_documents({"method": m})
        print(f"\tmethod {m}: {method_count}")
    
    # Count the number of GET requests with the path "/status"
    status_check = nginx_collection.count_documents({"method": "GET", "path": "/status"})
    print(f"{status_check} status check")

