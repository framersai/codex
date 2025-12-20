---
title: "Kafka Practical Guide"
summary: "Async Producer (Non-Blocking)



### 2. Batch Consumer (High Throughput)



### 3. Dead Letter Queue (Error Handling)



### 4."
difficulty: expert
tags:
  - python
  - bash
  - v
  - go
  - react
  - self
  - order
  - event
taxonomy:
  topics:
    - tutorial
    - api-reference
    - architecture
  subjects:
    - technology
    - artificial-intelligence
source:
  type: manual
  creator: "Anonymous Creator"
  creatorType: session
  createdAt: "2025-12-20T00:25:42.930Z"
  sessionId: "204f13d9-11b6-4c1c-97c4-76b50be079aa"
---
# Kafka Practical Guide

## From Zero to Production with Python Examples

---

## What is Kafka, Really?

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    KAFKA IN ONE SENTENCE                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Kafka is a distributed commit log that lets services talk to each other    │
│  without waiting for responses.                                             │
│                                                                             │
│  Think of it as a SUPER FAST, PERSISTENT, DISTRIBUTED message board:        │
│                                                                             │
│  • Producers POST messages to topics                                        │
│  • Consumers READ messages from topics                                      │
│  • Messages are STORED (not deleted after reading)                          │
│  • Multiple consumers can read the SAME messages                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### The Mental Model

```
TRADITIONAL API CALL (Synchronous):
══════════════════════════════════

  Order Service                    Email Service
       │                                │
       │  POST /send-email              │
       │───────────────────────────────►│
       │        (waiting...)            │ Sending email...
       │        (still waiting...)      │ (takes 2 seconds)
       │◄───────────────────────────────│
       │  200 OK                        │
       │                                │
  
  Problem: Order Service is BLOCKED for 2 seconds!
  If Email Service is down, Order Service FAILS!


KAFKA (Asynchronous):
════════════════════

  Order Service          Kafka              Email Service
       │                   │                      │
       │  "order.created"  │                      │
       │──────────────────►│                      │
       │  (instant!)       │                      │
       │                   │   (when ready)       │
       │                   │─────────────────────►│
       │                   │                      │ Sending email...
       │                   │                      │
  
  ✅ Order Service continues immediately
  ✅ Email Service can be down temporarily (Kafka stores messages)
  ✅ Multiple services can react to same event
```

---

## Where Kafka Fits in Real Systems

### Example 1: E-Commerce Order Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    E-COMMERCE WITH KAFKA                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  User places order                                                          │
│        │                                                                    │
│        ▼                                                                    │
│  ┌───────────────┐                                                          │
│  │ Order Service │                                                          │
│  │               │─────┐                                                    │
│  │ 1. Save order │     │                                                    │
│  │ 2. Publish    │     │                                                    │
│  └───────────────┘     │                                                    │
│                        ▼                                                    │
│              ┌─────────────────┐                                            │
│              │      KAFKA      │                                            │
│              │                 │                                            │
│              │ Topic: "orders" │                                            │
│              │ ┌─────────────┐ │                                            │
│              │ │ order.created│ │                                           │
│              │ │ {id: 123,   │ │                                            │
│              │ │  items: [...]}│                                            │
│              │ └─────────────┘ │                                            │
│              └────────┬────────┘                                            │
│                       │                                                     │
│         ┌─────────────┼─────────────┬─────────────┐                         │
│         ▼             ▼             ▼             ▼                         │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐                   │
│   │ Inventory│  │  Email   │  │ Analytics│  │ Shipping │                   │
│   │ Service  │  │ Service  │  │ Service  │  │ Service  │                   │
│   │          │  │          │  │          │  │          │                   │
│   │ Reduce   │  │ Send     │  │ Track    │  │ Create   │                   │
│   │ stock    │  │ confirm  │  │ metrics  │  │ label    │                   │
│   └──────────┘  └──────────┘  └──────────┘  └──────────┘                   │
│                                                                             │
│  ALL services consume the SAME event independently!                         │
│  If Analytics is slow, it doesn't affect Email.                             │
│  If Shipping is down, it catches up when it's back.                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Example 2: Real-Time Analytics Pipeline

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ANALYTICS PIPELINE                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Web App         Mobile App        API                                     │
│      │                │              │                                      │
│      │ click event    │ tap event    │ api call                             │
│      └────────────────┴──────────────┘                                      │
│                       │                                                     │
│                       ▼                                                     │
│              ┌─────────────────┐                                            │
│              │      KAFKA      │                                            │
│              │ Topic: "events" │                                            │
│              │                 │                                            │
│              │ 10K events/sec  │  ← Handles massive throughput              │
│              └────────┬────────┘                                            │
│                       │                                                     │
│         ┌─────────────┼─────────────┐                                       │
│         ▼             ▼             ▼                                       │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐                                 │
│   │ Real-time│  │  Batch   │  │  Fraud   │                                 │
│   │Dashboard │  │ to S3/   │  │Detection │                                 │
│   │(Flink)   │  │Snowflake │  │ (ML)     │                                 │
│   └──────────┘  └──────────┘  └──────────┘                                 │
│                                                                             │
│  Same events feed multiple systems with different latency needs             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Example 3: Microservices Event Bus

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MICROSERVICES COMMUNICATION                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Instead of services calling each other directly:                           │
│                                                                             │
│  ┌────────┐     ┌────────┐     ┌────────┐                                  │
│  │ User   │────►│ Order  │────►│ Email  │  Tight coupling!                 │
│  │ Service│     │ Service│     │ Service│  If one fails, all fail.         │
│  └────────┘     └────────┘     └────────┘                                  │
│                                                                             │
│  Use Kafka as an event bus:                                                 │
│                                                                             │
│  ┌────────┐     ┌─────────────────────────────────┐     ┌────────┐         │
│  │ User   │────►│           KAFKA                 │◄────│ Order  │         │
│  │ Service│     │                                 │     │ Service│         │
│  └────────┘     │  Topics:                        │     └────────┘         │
│                 │  • user.created                 │                        │
│  ┌────────┐     │  • user.updated                 │     ┌────────┐         │
│  │ Email  │◄────│  • order.placed                 │◄────│Billing │         │
│  │ Service│     │  • payment.completed            │     │ Service│         │
│  └────────┘     └─────────────────────────────────┘     └────────┘         │
│                                                                             │
│  Loose coupling! Services don't know about each other.                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Kafka Core Concepts

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    KAFKA VOCABULARY                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  TOPIC                                                                      │
│  ═════                                                                      │
│  A category/feed name for messages. Like a database table.                  │
│  Examples: "orders", "user-events", "payments"                              │
│                                                                             │
│  PARTITION                                                                  │
│  ═════════                                                                  │
│  Topics are split into partitions for parallelism.                          │
│  Each partition is an ordered, immutable log.                               │
│                                                                             │
│  Topic: "orders" (3 partitions)                                             │
│  ┌─────────────────────────────────────────────────┐                       │
│  │ Partition 0: [msg0] [msg3] [msg6] [msg9]  ...   │                       │
│  │ Partition 1: [msg1] [msg4] [msg7] [msg10] ...   │                       │
│  │ Partition 2: [msg2] [msg5] [msg8] [msg11] ...   │                       │
│  └─────────────────────────────────────────────────┘                       │
│                                                                             │
│  OFFSET                                                                     │
│  ══════                                                                     │
│  Position of a message in a partition. Like an array index.                 │
│  Consumers track their offset to know where they left off.                  │
│                                                                             │
│  Partition 0: [msg0] [msg1] [msg2] [msg3] [msg4]                           │
│               offset 0    1      2      3      4                            │
│                                    ↑                                        │
│                          Consumer is here (offset 2)                        │
│                                                                             │
│  PRODUCER                                                                   │
│  ════════                                                                   │
│  Application that WRITES messages to Kafka topics.                          │
│                                                                             │
│  CONSUMER                                                                   │
│  ════════                                                                   │
│  Application that READS messages from Kafka topics.                         │
│                                                                             │
│  CONSUMER GROUP                                                             │
│  ══════════════                                                             │
│  Multiple consumers working together. Each partition goes to ONE            │
│  consumer in the group (for parallel processing).                           │
│                                                                             │
│  Topic: "orders" (3 partitions)                                             │
│  Consumer Group: "email-service"                                            │
│                                                                             │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐                            │
│  │ Partition 0│  │ Partition 1│  │ Partition 2│                            │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘                            │
│        │               │               │                                    │
│        ▼               ▼               ▼                                    │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐                              │
│  │Consumer 1│    │Consumer 2│    │Consumer 3│                              │
│  └──────────┘    └──────────┘    └──────────┘                              │
│                                                                             │
│  BROKER                                                                     │
│  ══════                                                                     │
│  A Kafka server. Cluster = multiple brokers for reliability.                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Python Setup

### Installation

```bash
# Install kafka-python library
pip install kafka-python

# For async support (recommended for production)
pip install aiokafka

# For schema validation (production)
pip install confluent-kafka fastavro

# Docker: Run Kafka locally for development
docker run -d --name kafka \
  -p 9092:9092 \
  -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \
  -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 \
  confluentinc/cp-kafka:latest

# Or use docker-compose (easier)
```

### Docker Compose for Local Dev

```yaml
# docker-compose.yml
version: '3'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
    ports:
      - "2181:2181"

  kafka:
    image: confluentinc/cp-kafka:latest
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1

# Run: docker-compose up -d
```

---

## Basic Producer & Consumer

### Simple Producer

```python
# producer_basic.py
from kafka import KafkaProducer
import json

# ═══════════════════════════════════════════════════════════════════════════
# BASIC PRODUCER - Send messages to Kafka
# ═══════════════════════════════════════════════════════════════════════════

# Create producer
producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8'),  # Convert dict to JSON bytes
    key_serializer=lambda k: k.encode('utf-8') if k else None   # Keys are optional
)

# Send a message
message = {
    "order_id": "order_123",
    "user_id": "user_456",
    "items": [
        {"product_id": "prod_1", "quantity": 2, "price": 29.99},
        {"product_id": "prod_2", "quantity": 1, "price": 49.99}
    ],
    "total": 109.97,
    "timestamp": "2024-01-15T10:30:00Z"
}

# Send to topic "orders"
future = producer.send(
    topic='orders',
    key='user_456',      # Messages with same key go to same partition
    value=message
)

# Wait for confirmation (blocking)
result = future.get(timeout=10)
print(f"Message sent to partition {result.partition} at offset {result.offset}")

# Always flush before exiting
producer.flush()
producer.close()
```

### Simple Consumer

```python
# consumer_basic.py
from kafka import KafkaConsumer
import json

# ═══════════════════════════════════════════════════════════════════════════
# BASIC CONSUMER - Read messages from Kafka
# ═══════════════════════════════════════════════════════════════════════════

# Create consumer
consumer = KafkaConsumer(
    'orders',  # Topic to subscribe to
    bootstrap_servers=['localhost:9092'],
    group_id='order-processor',  # Consumer group name
    auto_offset_reset='earliest',  # Start from beginning if no offset saved
    enable_auto_commit=True,  # Automatically save progress
    value_deserializer=lambda m: json.loads(m.decode('utf-8'))
)

print("Waiting for messages...")

# This loops forever, processing messages as they arrive
for message in consumer:
    print(f"\n{'='*60}")
    print(f"Topic: {message.topic}")
    print(f"Partition: {message.partition}")
    print(f"Offset: {message.offset}")
    print(f"Key: {message.key}")
    print(f"Value: {message.value}")
    
    # Process the message
    order = message.value
    print(f"\nProcessing order {order['order_id']} for user {order['user_id']}")
    print(f"Total: ${order['total']}")
```

---

## Real-World Pattern: Order Processing System

### The Producer (Order Service)

```python
# order_service.py
"""
Order Service - Creates orders and publishes events to Kafka
"""
from kafka import KafkaProducer
from datetime import datetime
import json
import uuid

class OrderService:
    def __init__(self):
        self.producer = KafkaProducer(
            bootstrap_servers=['localhost:9092'],
            value_serializer=lambda v: json.dumps(v, default=str).encode('utf-8'),
            key_serializer=lambda k: k.encode('utf-8') if k else None,
            # Production settings:
            acks='all',  # Wait for all replicas to acknowledge
            retries=3,   # Retry on failure
            retry_backoff_ms=1000
        )
    
    def create_order(self, user_id: str, items: list) -> dict:
        """
        1. Validate order
        2. Save to database
        3. Publish event to Kafka
        """
        # Generate order
        order = {
            "order_id": f"order_{uuid.uuid4().hex[:8]}",
            "user_id": user_id,
            "items": items,
            "total": sum(item['price'] * item['quantity'] for item in items),
            "status": "pending",
            "created_at": datetime.utcnow().isoformat()
        }
        
        # In real app: Save to database here
        # db.orders.insert(order)
        
        # Publish event
        self._publish_event('orders', 'order.created', order, key=user_id)
        
        return order
    
    def update_order_status(self, order_id: str, status: str):
        """Update order status and publish event"""
        event = {
            "order_id": order_id,
            "status": status,
            "updated_at": datetime.utcnow().isoformat()
        }
        
        self._publish_event('orders', 'order.status_changed', event, key=order_id)
    
    def _publish_event(self, topic: str, event_type: str, data: dict, key: str = None):
        """Publish event to Kafka with metadata"""
        message = {
            "event_type": event_type,
            "event_id": str(uuid.uuid4()),
            "timestamp": datetime.utcnow().isoformat(),
            "data": data
        }
        
        future = self.producer.send(topic, key=key, value=message)
        
        # Log result (async callback would be better in production)
        try:
            result = future.get(timeout=10)
            print(f"✓ Published {event_type} to {topic}[{result.partition}] @ offset {result.offset}")
        except Exception as e:
            print(f"✗ Failed to publish {event_type}: {e}")
            raise
    
    def close(self):
        self.producer.flush()
        self.producer.close()


# Usage
if __name__ == "__main__":
    service = OrderService()
    
    # Create some orders
    order1 = service.create_order(
        user_id="user_123",
        items=[
            {"product_id": "prod_1", "name": "Widget", "price": 29.99, "quantity": 2},
            {"product_id": "prod_2", "name": "Gadget", "price": 49.99, "quantity": 1}
        ]
    )
    print(f"Created order: {order1['order_id']}")
    
    # Update status
    service.update_order_status(order1['order_id'], "confirmed")
    
    service.close()
```

### Consumer: Email Service

```python
# email_service.py
"""
Email Service - Listens for order events and sends emails
"""
from kafka import KafkaConsumer
import json

class EmailService:
    def __init__(self):
        self.consumer = KafkaConsumer(
            'orders',  # Subscribe to orders topic
            bootstrap_servers=['localhost:9092'],
            group_id='email-service',  # This service's consumer group
            auto_offset_reset='earliest',
            enable_auto_commit=False,  # Manual commit for reliability
            value_deserializer=lambda m: json.loads(m.decode('utf-8'))
        )
    
    def run(self):
        """Main loop - process messages forever"""
        print("Email Service started. Waiting for order events...")
        
        for message in self.consumer:
            try:
                event = message.value
                self._handle_event(event)
                
                # Commit offset AFTER successful processing
                self.consumer.commit()
                
            except Exception as e:
                print(f"Error processing message: {e}")
                # Don't commit - message will be reprocessed
    
    def _handle_event(self, event: dict):
        """Route events to appropriate handlers"""
        event_type = event.get('event_type')
        data = event.get('data', {})
        
        if event_type == 'order.created':
            self._send_order_confirmation(data)
        elif event_type == 'order.status_changed':
            self._send_status_update(data)
        else:
            print(f"Unknown event type: {event_type}")
    
    def _send_order_confirmation(self, order: dict):
        """Send order confirmation email"""
        print(f"\n📧 Sending order confirmation email:")
        print(f"   To: {order['user_id']}")
        print(f"   Order: {order['order_id']}")
        print(f"   Total: ${order['total']:.2f}")
        print(f"   Items: {len(order['items'])} items")
        
        # In real app: 
        # email_client.send(
        #     to=get_user_email(order['user_id']),
        #     template='order_confirmation',
        #     data=order
        # )
    
    def _send_status_update(self, data: dict):
        """Send status update email"""
        print(f"\n📧 Sending status update email:")
        print(f"   Order: {data['order_id']}")
        print(f"   New Status: {data['status']}")


if __name__ == "__main__":
    service = EmailService()
    service.run()
```

### Consumer: Inventory Service

```python
# inventory_service.py
"""
Inventory Service - Reserves stock when orders are created
"""
from kafka import KafkaConsumer, KafkaProducer
import json

class InventoryService:
    def __init__(self):
        self.consumer = KafkaConsumer(
            'orders',
            bootstrap_servers=['localhost:9092'],
            group_id='inventory-service',  # Different group = gets ALL messages
            auto_offset_reset='earliest',
            enable_auto_commit=False,
            value_deserializer=lambda m: json.loads(m.decode('utf-8'))
        )
        
        # This service also produces events
        self.producer = KafkaProducer(
            bootstrap_servers=['localhost:9092'],
            value_serializer=lambda v: json.dumps(v, default=str).encode('utf-8')
        )
        
        # Fake inventory database
        self.inventory = {
            "prod_1": 100,
            "prod_2": 50,
            "prod_3": 0
        }
    
    def run(self):
        print("Inventory Service started. Waiting for order events...")
        
        for message in self.consumer:
            event = message.value
            
            if event.get('event_type') == 'order.created':
                order = event['data']
                success = self._reserve_stock(order)
                
                # Publish result event
                result_event = {
                    "event_type": "inventory.reserved" if success else "inventory.failed",
                    "data": {
                        "order_id": order['order_id'],
                        "success": success
                    }
                }
                self.producer.send('inventory', value=result_event)
            
            self.consumer.commit()
    
    def _reserve_stock(self, order: dict) -> bool:
        """Reserve stock for order items"""
        print(f"\n📦 Reserving stock for order {order['order_id']}:")
        
        # Check all items have stock
        for item in order['items']:
            product_id = item['product_id']
            quantity = item['quantity']
            available = self.inventory.get(product_id, 0)
            
            if available < quantity:
                print(f"   ✗ {product_id}: Need {quantity}, have {available} - FAILED")
                return False
        
        # Reserve stock
        for item in order['items']:
            product_id = item['product_id']
            quantity = item['quantity']
            self.inventory[product_id] -= quantity
            print(f"   ✓ {product_id}: Reserved {quantity}, remaining: {self.inventory[product_id]}")
        
        return True


if __name__ == "__main__":
    service = InventoryService()
    service.run()
```

### Consumer: Analytics Service

```python
# analytics_service.py
"""
Analytics Service - Tracks metrics from order events
"""
from kafka import KafkaConsumer
from collections import defaultdict
from datetime import datetime
import json

class AnalyticsService:
    def __init__(self):
        self.consumer = KafkaConsumer(
            'orders',
            bootstrap_servers=['localhost:9092'],
            group_id='analytics-service',
            auto_offset_reset='earliest',
            enable_auto_commit=True,
            value_deserializer=lambda m: json.loads(m.decode('utf-8'))
        )
        
        # In-memory metrics (use Redis/DB in production)
        self.metrics = {
            "total_orders": 0,
            "total_revenue": 0.0,
            "orders_by_hour": defaultdict(int),
            "revenue_by_user": defaultdict(float)
        }
    
    def run(self):
        print("Analytics Service started. Tracking order metrics...")
        
        for message in self.consumer:
            event = message.value
            
            if event.get('event_type') == 'order.created':
                self._track_order(event['data'])
                self._print_metrics()
    
    def _track_order(self, order: dict):
        """Update metrics"""
        self.metrics["total_orders"] += 1
        self.metrics["total_revenue"] += order['total']
        
        hour = datetime.fromisoformat(order['created_at']).strftime("%Y-%m-%d %H:00")
        self.metrics["orders_by_hour"][hour] += 1
        
        self.metrics["revenue_by_user"][order['user_id']] += order['total']
    
    def _print_metrics(self):
        print(f"\n📊 Analytics Dashboard:")
        print(f"   Total Orders: {self.metrics['total_orders']}")
        print(f"   Total Revenue: ${self.metrics['total_revenue']:.2f}")
        print(f"   Avg Order Value: ${self.metrics['total_revenue']/self.metrics['total_orders']:.2f}")


if __name__ == "__main__":
    service = AnalyticsService()
    service.run()
```

---

## Running the Full System

```bash
# Terminal 1: Start Kafka (if using docker-compose)
docker-compose up

# Terminal 2: Start Email Service
python email_service.py

# Terminal 3: Start Inventory Service  
python inventory_service.py

# Terminal 4: Start Analytics Service
python analytics_service.py

# Terminal 5: Create orders
python order_service.py

# Watch all services react to the same events!
```

---

## Production Patterns

### 1. Async Producer (Non-Blocking)

```python
# async_producer.py
"""
Async producer for high-throughput scenarios
"""
from kafka import KafkaProducer
import json
import threading

class AsyncOrderPublisher:
    def __init__(self):
        self.producer = KafkaProducer(
            bootstrap_servers=['localhost:9092'],
            value_serializer=lambda v: json.dumps(v, default=str).encode('utf-8'),
            # Performance tuning
            batch_size=16384,      # Batch messages (16KB)
            linger_ms=10,          # Wait up to 10ms to batch
            compression_type='gzip',  # Compress batches
            acks='all',
            retries=3
        )
        self._pending = 0
        self._lock = threading.Lock()
    
    def publish(self, topic: str, message: dict, key: str = None):
        """Non-blocking publish with callback"""
        with self._lock:
            self._pending += 1
        
        future = self.producer.send(
            topic,
            key=key.encode('utf-8') if key else None,
            value=message
        )
        
        # Add callbacks for success/failure
        future.add_callback(self._on_success)
        future.add_errback(self._on_error)
        
        return future
    
    def _on_success(self, record_metadata):
        with self._lock:
            self._pending -= 1
        print(f"✓ Sent to {record_metadata.topic}[{record_metadata.partition}]")
    
    def _on_error(self, exception):
        with self._lock:
            self._pending -= 1
        print(f"✗ Error: {exception}")
    
    def flush_and_close(self):
        """Wait for all pending messages"""
        print(f"Flushing {self._pending} pending messages...")
        self.producer.flush()
        self.producer.close()


# Usage - fire and forget
publisher = AsyncOrderPublisher()

for i in range(1000):
    publisher.publish('orders', {'order_id': f'order_{i}', 'amount': 99.99})

publisher.flush_and_close()
```

### 2. Batch Consumer (High Throughput)

```python
# batch_consumer.py
"""
Process messages in batches for efficiency
"""
from kafka import KafkaConsumer
import json

class BatchProcessor:
    def __init__(self, batch_size=100, batch_timeout_ms=5000):
        self.consumer = KafkaConsumer(
            'orders',
            bootstrap_servers=['localhost:9092'],
            group_id='batch-processor',
            auto_offset_reset='earliest',
            enable_auto_commit=False,
            value_deserializer=lambda m: json.loads(m.decode('utf-8')),
            # Batch settings
            max_poll_records=batch_size,  # Max messages per poll
            fetch_max_wait_ms=batch_timeout_ms
        )
        self.batch_size = batch_size
    
    def run(self):
        print(f"Batch processor started (batch_size={self.batch_size})")
        
        while True:
            # poll() returns messages from multiple partitions
            messages = self.consumer.poll(timeout_ms=5000)
            
            if not messages:
                continue
            
            # Collect all messages into batch
            batch = []
            for topic_partition, records in messages.items():
                for record in records:
                    batch.append(record.value)
            
            if batch:
                self._process_batch(batch)
                self.consumer.commit()
    
    def _process_batch(self, batch: list):
        """Process entire batch at once - much more efficient!"""
        print(f"\n📦 Processing batch of {len(batch)} messages")
        
        # Example: Bulk insert to database
        # db.orders.insert_many(batch)
        
        # Example: Bulk API call
        # external_api.bulk_update([msg['order_id'] for msg in batch])
        
        for msg in batch:
            print(f"   - Order: {msg.get('data', {}).get('order_id', 'N/A')}")


if __name__ == "__main__":
    processor = BatchProcessor(batch_size=50)
    processor.run()
```

### 3. Dead Letter Queue (Error Handling)

```python
# dlq_consumer.py
"""
Handle failed messages with Dead Letter Queue pattern
"""
from kafka import KafkaConsumer, KafkaProducer
import json
import traceback

class ResilientConsumer:
    def __init__(self, topic: str, group_id: str, max_retries: int = 3):
        self.topic = topic
        self.max_retries = max_retries
        
        self.consumer = KafkaConsumer(
            topic,
            bootstrap_servers=['localhost:9092'],
            group_id=group_id,
            auto_offset_reset='earliest',
            enable_auto_commit=False,
            value_deserializer=lambda m: json.loads(m.decode('utf-8'))
        )
        
        # Producer for DLQ
        self.producer = KafkaProducer(
            bootstrap_servers=['localhost:9092'],
            value_serializer=lambda v: json.dumps(v, default=str).encode('utf-8')
        )
        
        self.dlq_topic = f"{topic}.dlq"
        self.retry_topic = f"{topic}.retry"
    
    def run(self, process_func):
        """Run consumer with retry and DLQ support"""
        print(f"Starting resilient consumer for {self.topic}")
        
        for message in self.consumer:
            event = message.value
            retry_count = event.get('_retry_count', 0)
            
            try:
                # Process the message
                process_func(event)
                self.consumer.commit()
                
            except Exception as e:
                print(f"✗ Error processing message: {e}")
                
                if retry_count < self.max_retries:
                    # Send to retry topic
                    event['_retry_count'] = retry_count + 1
                    event['_last_error'] = str(e)
                    self.producer.send(self.retry_topic, value=event)
                    print(f"  → Sent to retry queue (attempt {retry_count + 1}/{self.max_retries})")
                else:
                    # Max retries exceeded - send to DLQ
                    event['_error'] = str(e)
                    event['_traceback'] = traceback.format_exc()
                    self.producer.send(self.dlq_topic, value=event)
                    print(f"  → Sent to Dead Letter Queue")
                
                self.consumer.commit()  # Move past this message


def risky_processor(event):
    """Example processor that might fail"""
    import random
    if random.random() < 0.3:  # 30% failure rate
        raise Exception("Random processing failure!")
    print(f"✓ Processed: {event.get('data', {}).get('order_id', 'N/A')}")


if __name__ == "__main__":
    consumer = ResilientConsumer('orders', 'risky-processor')
    consumer.run(risky_processor)
```

### 4. Exactly-Once Processing (Idempotent)

```python
# idempotent_consumer.py
"""
Ensure messages are processed exactly once using idempotency
"""
from kafka import KafkaConsumer
import json
import redis

class IdempotentConsumer:
    def __init__(self, topic: str, group_id: str):
        self.consumer = KafkaConsumer(
            topic,
            bootstrap_servers=['localhost:9092'],
            group_id=group_id,
            auto_offset_reset='earliest',
            enable_auto_commit=False,
            value_deserializer=lambda m: json.loads(m.decode('utf-8'))
        )
        
        # Redis for tracking processed message IDs
        self.redis = redis.Redis(host='localhost', port=6379, db=0)
        self.processed_key = f"processed:{group_id}"
    
    def run(self, process_func):
        """Process each message exactly once"""
        for message in self.consumer:
            event = message.value
            event_id = event.get('event_id')
            
            if not event_id:
                print("⚠ Message missing event_id, skipping")
                self.consumer.commit()
                continue
            
            # Check if already processed
            if self._is_processed(event_id):
                print(f"⏭ Skipping duplicate: {event_id}")
                self.consumer.commit()
                continue
            
            try:
                # Process the message
                process_func(event)
                
                # Mark as processed AFTER successful processing
                self._mark_processed(event_id)
                self.consumer.commit()
                
            except Exception as e:
                print(f"✗ Error: {e} - will retry")
                # Don't commit, don't mark as processed
    
    def _is_processed(self, event_id: str) -> bool:
        """Check if event was already processed"""
        return self.redis.sismember(self.processed_key, event_id)
    
    def _mark_processed(self, event_id: str):
        """Mark event as processed (with 7-day expiry)"""
        self.redis.sadd(self.processed_key, event_id)
        self.redis.expire(self.processed_key, 7 * 24 * 60 * 60)


def process_payment(event):
    """Process payment - MUST be idempotent!"""
    order = event.get('data', {})
    print(f"💳 Processing payment for order {order.get('order_id')}")
    print(f"   Amount: ${order.get('total', 0):.2f}")
    # In real app: charge_customer(order['user_id'], order['total'])


if __name__ == "__main__":
    consumer = IdempotentConsumer('orders', 'payment-processor')
    consumer.run(process_payment)
```

---

## Async Kafka with asyncio

```python
# async_kafka.py
"""
Async Kafka with aiokafka - for high-performance async applications
"""
import asyncio
from aiokafka import AIOKafkaProducer, AIOKafkaConsumer
import json

class AsyncKafkaService:
    def __init__(self):
        self.bootstrap_servers = 'localhost:9092'
        self.producer = None
        self.consumer = None
    
    async def start_producer(self):
        self.producer = AIOKafkaProducer(
            bootstrap_servers=self.bootstrap_servers,
            value_serializer=lambda v: json.dumps(v, default=str).encode('utf-8')
        )
        await self.producer.start()
    
    async def stop_producer(self):
        await self.producer.stop()
    
    async def publish(self, topic: str, message: dict):
        """Async publish"""
        await self.producer.send_and_wait(topic, message)
    
    async def consume(self, topic: str, group_id: str, handler):
        """Async consume with handler"""
        consumer = AIOKafkaConsumer(
            topic,
            bootstrap_servers=self.bootstrap_servers,
            group_id=group_id,
            value_deserializer=lambda m: json.loads(m.decode('utf-8'))
        )
        
        await consumer.start()
        
        try:
            async for message in consumer:
                await handler(message.value)
        finally:
            await consumer.stop()


# Example usage with FastAPI
from fastapi import FastAPI

app = FastAPI()
kafka = AsyncKafkaService()

@app.on_event("startup")
async def startup():
    await kafka.start_producer()

@app.on_event("shutdown")
async def shutdown():
    await kafka.stop_producer()

@app.post("/orders")
async def create_order(order: dict):
    # Save to DB...
    
    # Publish event (non-blocking)
    await kafka.publish('orders', {
        'event_type': 'order.created',
        'data': order
    })
    
    return {"status": "created", "order_id": order['id']}
```

---

## Kafka vs Other Queues

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    WHEN TO USE WHAT                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  KAFKA                                                                      │
│  ═════                                                                      │
│  ✅ High throughput (millions/sec)                                          │
│  ✅ Message replay (reprocess from any point)                               │
│  ✅ Multiple consumers read same messages                                   │
│  ✅ Event sourcing, real-time analytics                                     │
│  ❌ More complex to set up                                                  │
│  ❌ Overkill for simple job queues                                          │
│                                                                             │
│  Use for: Event streaming, analytics pipelines, microservices events        │
│                                                                             │
│                                                                             │
│  RABBITMQ                                                                   │
│  ════════                                                                   │
│  ✅ Flexible routing (exchanges, bindings)                                  │
│  ✅ Message acknowledgment, dead-letter queues                              │
│  ✅ Good for task queues                                                    │
│  ❌ Message deleted after consumption                                       │
│  ❌ Lower throughput than Kafka                                             │
│                                                                             │
│  Use for: Task queues, RPC, complex routing                                 │
│                                                                             │
│                                                                             │
│  AMAZON SQS                                                                 │
│  ══════════                                                                 │
│  ✅ Zero maintenance (fully managed)                                        │
│  ✅ Simple API                                                              │
│  ✅ Scales automatically                                                    │
│  ❌ AWS lock-in                                                             │
│  ❌ Higher latency                                                          │
│                                                                             │
│  Use for: Simple job queues on AWS                                          │
│                                                                             │
│                                                                             │
│  REDIS STREAMS                                                              │
│  ═════════════                                                              │
│  ✅ You already have Redis                                                  │
│  ✅ Simple, fast                                                            │
│  ✅ Consumer groups (Kafka-like)                                            │
│  ❌ Not as durable as Kafka                                                 │
│  ❌ Limited retention                                                       │
│                                                                             │
│  Use for: Lightweight streaming, already using Redis                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Quick Reference

```python
# ═══════════════════════════════════════════════════════════════════════════
# KAFKA PYTHON CHEAT SHEET
# ═══════════════════════════════════════════════════════════════════════════

# PRODUCER
from kafka import KafkaProducer
producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)
producer.send('topic', value={'key': 'value'})
producer.flush()

# CONSUMER
from kafka import KafkaConsumer
consumer = KafkaConsumer(
    'topic',
    bootstrap_servers=['localhost:9092'],
    group_id='my-group',
    value_deserializer=lambda m: json.loads(m.decode('utf-8'))
)
for message in consumer:
    print(message.value)

# KEY SETTINGS
# Producer:
#   acks='all'           - Wait for all replicas (durability)
#   retries=3            - Retry on failure
#   batch_size=16384     - Batch messages (throughput)
#   linger_ms=10         - Wait to batch (throughput)
#   compression='gzip'   - Compress (throughput)

# Consumer:
#   group_id             - Consumer group name
#   auto_offset_reset    - 'earliest' or 'latest'
#   enable_auto_commit   - True/False
#   max_poll_records     - Batch size

# COMMON PATTERNS
# 1. Fire and forget (async)
# 2. Sync with callback (wait for ack)
# 3. Batch processing (high throughput)
# 4. Dead letter queue (error handling)
# 5. Idempotent processing (exactly-once)
```

---

## Interview Talking Points

```
"I've used Kafka in production for..."

1. EVENT-DRIVEN ARCHITECTURE
   "We used Kafka as our event bus. When a user signs up, we publish
    a 'user.created' event. Multiple services - email, analytics, 
    onboarding - all consume that event independently."

2. DECOUPLING SERVICES
   "Instead of Order Service calling Inventory directly, we publish
    events to Kafka. This way if Inventory is slow or down, orders
    still work. Inventory catches up when it's back."

3. REPLAY CAPABILITY
   "When we deployed a bug to our analytics consumer, we could replay
    the last week of events to reprocess. Can't do that with RabbitMQ."

4. HANDLING SCALE
   "We partition by user_id, so all events for a user go to the same
    partition. This gives us ordering guarantees per-user while still
    allowing parallel processing across users."

5. EXACTLY-ONCE PROCESSING
   "We use idempotency keys stored in Redis. Before processing a payment,
    we check if we've seen that event_id before. This prevents double-charging
    even if Kafka delivers the message twice."
```

---






