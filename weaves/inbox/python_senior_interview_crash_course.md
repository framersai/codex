---
title: "Python Senior Interview Crash Course"
summary: "[Python Internals You Must Know](#1-python-internals)
2. [Data Structures Deep Dive](#2-data-structures)
3. [Complexity Analysis Refresher](#3-complexity-analysis)
4."
difficulty: expert
tags:
  - python
  - v
  - r
  - sql
  - numpy
  - self
  - return
  - def
taxonomy:
  topics:
    - api-reference
    - architecture
  subjects:
    - technology
    - artificial-intelligence
source:
  type: manual
  creator: "Anonymous Creator"
  creatorType: session
  createdAt: "2025-12-20T00:28:56.465Z"
  sessionId: "204f13d9-11b6-4c1c-97c4-76b50be079aa"
---
# Python Senior Interview Crash Course
## From Fundamentals to Staff-Level Mastery

---

## Table of Contents

1. [Python Internals You Must Know](#1-python-internals)
2. [Data Structures Deep Dive](#2-data-structures)
3. [Complexity Analysis Refresher](#3-complexity-analysis)
4. [Core Algorithm Patterns](#4-algorithm-patterns)
5. [Advanced Python Features](#5-advanced-python)
6. [Concurrency & Parallelism](#6-concurrency)
7. [Object-Oriented Design](#7-oop-design)
8. [LeetCode Patterns & Solutions](#8-leetcode-patterns)
9. [System Design in Python](#9-system-design)
10. [Senior-Level Interview Questions](#10-senior-questions)

---

## 1. Python Internals You Must Know {#1-python-internals}

### Memory Management

#### Everything is an Object

```python
# In Python, EVERYTHING is an object - even integers and functions
x = 42
print(type(x))        # <class 'int'>
print(id(x))          # Memory address
print(x.__class__)    # <class 'int'>
print(x.__add__(8))   # 50 - even operators are methods!

# Functions are first-class objects
def greet(name):
    return f"Hello, {name}"

print(type(greet))           # <class 'function'>
print(greet.__name__)        # 'greet'
print(greet.__code__.co_varnames)  # ('name',)
```

#### Reference Counting + Garbage Collection

```python
import sys
import gc

# Reference counting
a = [1, 2, 3]
print(sys.getrefcount(a))  # 2 (a + temporary reference from getrefcount)

b = a  # Another reference
print(sys.getrefcount(a))  # 3

del b  # Remove reference
print(sys.getrefcount(a))  # 2

# Circular references - need garbage collector
class Node:
    def __init__(self):
        self.parent = None
        self.children = []

parent = Node()
child = Node()
parent.children.append(child)
child.parent = parent  # Circular reference!

# Reference counting alone won't free these
# Python's GC detects and collects cycles
del parent
del child
gc.collect()  # Force garbage collection
```

#### Small Integer Caching (-5 to 256)

```python
# Python caches small integers for performance
a = 256
b = 256
print(a is b)  # True - same object!

a = 257
b = 257
print(a is b)  # False - different objects!

# String interning for identifiers
s1 = "hello"
s2 = "hello"
print(s1 is s2)  # True - interned

s1 = "hello world!"
s2 = "hello world!"
print(s1 is s2)  # False - not interned (has space/special chars)

# Force interning
import sys
s1 = sys.intern("hello world!")
s2 = sys.intern("hello world!")
print(s1 is s2)  # True
```

#### Mutability Deep Dive

```python
# Mutable: list, dict, set, custom objects
# Immutable: int, float, str, tuple, frozenset, bytes

# The Classic Gotcha: Default Mutable Arguments
def append_to(element, lst=[]):  # DANGEROUS!
    lst.append(element)
    return lst

print(append_to(1))  # [1]
print(append_to(2))  # [1, 2] - WHAT?! Same list reused!

# Correct pattern
def append_to_fixed(element, lst=None):
    if lst is None:
        lst = []
    lst.append(element)
    return lst

# Why tuples can contain mutable objects
t = ([1, 2], [3, 4])
t[0].append(3)  # This works!
print(t)  # ([1, 2, 3], [3, 4])
# t[0] = [5, 6]  # This fails - can't reassign tuple element

# Tuple "immutability" means you can't change which objects it references
# But you CAN mutate those objects if they're mutable
```

### The Global Interpreter Lock (GIL)

```python
"""
THE GIL: Python's Most Misunderstood Feature

What it is:
- A mutex that protects access to Python objects
- Only ONE thread can execute Python bytecode at a time
- Exists in CPython (reference implementation)

What it means:
- CPU-bound multithreading won't give speedup
- I/O-bound multithreading WILL work (GIL released during I/O)
- Use multiprocessing for CPU parallelism
"""

import threading
import time

# This WON'T be faster with multiple threads (CPU-bound)
def cpu_bound(n):
    count = 0
    for i in range(n):
        count += i
    return count

# Single thread
start = time.time()
cpu_bound(10_000_000)
cpu_bound(10_000_000)
print(f"Sequential: {time.time() - start:.2f}s")

# Two threads - NOT faster due to GIL!
start = time.time()
t1 = threading.Thread(target=cpu_bound, args=(10_000_000,))
t2 = threading.Thread(target=cpu_bound, args=(10_000_000,))
t1.start(); t2.start()
t1.join(); t2.join()
print(f"Threaded: {time.time() - start:.2f}s")  # Same or slower!

# Solution: multiprocessing (separate interpreter per process)
from multiprocessing import Pool

start = time.time()
with Pool(2) as p:
    p.map(cpu_bound, [10_000_000, 10_000_000])
print(f"Multiprocess: {time.time() - start:.2f}s")  # ~2x faster!
```

### Python Object Model

```python
# __slots__: Memory optimization for many instances
class PointRegular:
    def __init__(self, x, y):
        self.x = x
        self.y = y

class PointSlots:
    __slots__ = ['x', 'y']  # No __dict__, fixed attributes
    def __init__(self, x, y):
        self.x = x
        self.y = y

import sys
regular = PointRegular(1, 2)
slotted = PointSlots(1, 2)

print(sys.getsizeof(regular.__dict__))  # ~104 bytes for dict
# slotted has no __dict__ - saves memory!

# Use when: Creating millions of simple objects
# Don't use when: Need dynamic attributes or inheritance flexibility


# Descriptors: The magic behind @property, @classmethod, etc.
class Validator:
    def __set_name__(self, owner, name):
        self.name = name
        self.private_name = '_' + name
    
    def __get__(self, obj, objtype=None):
        return getattr(obj, self.private_name, None)
    
    def __set__(self, obj, value):
        self.validate(value)
        setattr(obj, self.private_name, value)
    
    def validate(self, value):
        pass  # Override in subclasses

class PositiveNumber(Validator):
    def validate(self, value):
        if value < 0:
            raise ValueError(f'{self.name} must be positive')

class Product:
    price = PositiveNumber()  # Descriptor
    quantity = PositiveNumber()
    
    def __init__(self, price, quantity):
        self.price = price
        self.quantity = quantity

p = Product(10.0, 5)
# p.price = -5  # Raises ValueError!
```

---

## 2. Data Structures Deep Dive {#2-data-structures}

### Python Built-in Structures: Under the Hood

#### Lists (Dynamic Arrays)

```python
"""
List Implementation:
- Contiguous memory (like C array)
- Over-allocates to amortize append cost
- Growth factor ~1.125 (grows by 12.5%)
"""

import sys

lst = []
for i in range(20):
    print(f"len={len(lst):2d}, size={sys.getsizeof(lst)} bytes")
    lst.append(i)

# Output shows jumps in memory allocation
# len= 0, size=56 bytes
# len= 1, size=88 bytes   (allocated for 4)
# len= 5, size=120 bytes  (allocated for 8)
# etc.

# Time Complexities:
# - Access by index: O(1)
# - Append: O(1) amortized
# - Insert at index: O(n) - must shift elements
# - Delete by index: O(n) - must shift elements
# - Search: O(n)
# - Slice: O(k) where k is slice size

# Common Operations
lst = [3, 1, 4, 1, 5, 9, 2, 6]

# Sorting (Timsort - O(n log n))
sorted_lst = sorted(lst)  # Returns new list
lst.sort()  # In-place
lst.sort(key=lambda x: -x)  # Custom key
lst.sort(reverse=True)  # Descending

# Reverse
lst.reverse()  # In-place O(n)
reversed_lst = lst[::-1]  # New list O(n)

# List comprehension vs map/filter
squares = [x**2 for x in range(10)]  # Preferred
squares = list(map(lambda x: x**2, range(10)))  # Functional

evens = [x for x in range(10) if x % 2 == 0]  # Preferred
evens = list(filter(lambda x: x % 2 == 0, range(10)))  # Functional
```

#### Dictionaries (Hash Maps)

```python
"""
Dict Implementation (Python 3.7+):
- Hash table with open addressing
- Maintains insertion order (guaranteed since 3.7)
- Load factor ~2/3 before resize
- Resize doubles the table
"""

# Time Complexities:
# - Get/Set/Delete: O(1) average, O(n) worst case
# - Iteration: O(n)
# - "in" check: O(1) average

# Creation methods
d1 = {'a': 1, 'b': 2}
d2 = dict(a=1, b=2)
d3 = dict([('a', 1), ('b', 2)])
d4 = {x: x**2 for x in range(5)}  # Dict comprehension

# Essential methods
d = {'a': 1, 'b': 2, 'c': 3}

# get() with default - NEVER use d[key] if key might not exist
value = d.get('z', 0)  # Returns 0, not KeyError

# setdefault() - get or set if missing
d.setdefault('d', 4)  # Sets d['d'] = 4 AND returns 4

# pop() with default
value = d.pop('z', None)  # Returns None, not KeyError

# update() - merge dicts
d.update({'e': 5, 'f': 6})
d |= {'g': 7}  # Python 3.9+ merge operator

# Merge dicts (Python 3.9+)
merged = d1 | d2  # d2 values override d1

# Dictionary views
keys = d.keys()    # View object, reflects changes
values = d.values()
items = d.items()

# Common patterns

# Counting
from collections import Counter
words = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple']
counts = Counter(words)  # Counter({'apple': 3, 'banana': 2, 'cherry': 1})
counts.most_common(2)    # [('apple', 3), ('banana', 2)]

# Grouping
from collections import defaultdict
grouped = defaultdict(list)
for name, score in [('alice', 90), ('bob', 80), ('alice', 95)]:
    grouped[name].append(score)
# defaultdict(list, {'alice': [90, 95], 'bob': [80]})

# Ordered operations (Python 3.7+)
d = {'c': 3, 'a': 1, 'b': 2}
# Sort by key
sorted_d = dict(sorted(d.items()))  # {'a': 1, 'b': 2, 'c': 3}
# Sort by value
sorted_d = dict(sorted(d.items(), key=lambda x: x[1]))
```

#### Sets (Hash Sets)

```python
"""
Set Implementation:
- Hash table (like dict, but only keys)
- Unordered (no insertion order guarantee)
- Elements must be hashable (immutable)
"""

# Time Complexities:
# - Add/Remove/Contains: O(1) average
# - Union/Intersection/Difference: O(len(s1) + len(s2))

s1 = {1, 2, 3, 4, 5}
s2 = {4, 5, 6, 7, 8}

# Set operations
union = s1 | s2           # {1, 2, 3, 4, 5, 6, 7, 8}
intersection = s1 & s2    # {4, 5}
difference = s1 - s2      # {1, 2, 3}
symmetric_diff = s1 ^ s2  # {1, 2, 3, 6, 7, 8}

# Subset/superset
{1, 2}.issubset(s1)      # True
s1.issuperset({1, 2})    # True

# Frozen set (immutable, can be dict key or set element)
fs = frozenset([1, 2, 3])
d = {fs: 'value'}  # Valid!

# Common patterns
# Remove duplicates while preserving order
lst = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]
seen = set()
unique = [x for x in lst if not (x in seen or seen.add(x))]
# [3, 1, 4, 5, 9, 2, 6]

# Or simpler (Python 3.7+)
unique = list(dict.fromkeys(lst))
```

### Collections Module: Power Tools

```python
from collections import (
    deque, defaultdict, Counter, OrderedDict, namedtuple, ChainMap
)

# ============ deque: Double-ended Queue ============
# O(1) append/pop from BOTH ends (vs O(n) for list.insert(0))
d = deque([1, 2, 3])
d.appendleft(0)   # [0, 1, 2, 3]
d.append(4)       # [0, 1, 2, 3, 4]
d.popleft()       # 0
d.pop()           # 4
d.rotate(1)       # [3, 1, 2] - rotate right
d.rotate(-1)      # [1, 2, 3] - rotate left

# Fixed-size deque (great for sliding window)
window = deque(maxlen=3)
for i in range(5):
    window.append(i)
    print(list(window))
# [0]
# [0, 1]
# [0, 1, 2]
# [1, 2, 3]  <- 0 automatically removed
# [2, 3, 4]

# ============ defaultdict: Dict with Default Factory ============
# Adjacency list for graph
graph = defaultdict(list)
edges = [(1, 2), (1, 3), (2, 4)]
for u, v in edges:
    graph[u].append(v)
    graph[v].append(u)  # For undirected

# Nested defaultdict
tree = lambda: defaultdict(tree)
taxonomy = tree()
taxonomy['Animal']['Mammal']['Dog'] = 'Canis familiaris'
taxonomy['Animal']['Mammal']['Cat'] = 'Felis catus'

# ============ Counter: Counting Made Easy ============
text = "abracadabra"
c = Counter(text)  # Counter({'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1})

c.most_common(3)           # [('a', 5), ('b', 2), ('r', 2)]
c['a']                     # 5
c['z']                     # 0 (no KeyError!)
c.update("aaa")            # Add more
c.subtract("a")            # Subtract

# Counter arithmetic
c1 = Counter(a=3, b=1)
c2 = Counter(a=1, b=2)
c1 + c2  # Counter({'a': 4, 'b': 3})
c1 - c2  # Counter({'a': 2}) - only positive counts
c1 & c2  # Counter({'a': 1, 'b': 1}) - min of each
c1 | c2  # Counter({'a': 3, 'b': 2}) - max of each

# ============ OrderedDict: Dict with Order Operations ============
# Less useful since Python 3.7, but has move_to_end()
from collections import OrderedDict

class LRUCache:
    """LRU Cache using OrderedDict"""
    def __init__(self, capacity: int):
        self.cache = OrderedDict()
        self.capacity = capacity
    
    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)  # Mark as recently used
        return self.cache[key]
    
    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)  # Remove oldest

# ============ namedtuple: Lightweight Immutable Objects ============
Point = namedtuple('Point', ['x', 'y'])
p = Point(3, 4)
print(p.x, p.y)     # 3 4
print(p[0], p[1])   # 3 4 (also indexable)
x, y = p            # Unpackable

# With defaults (Python 3.7+)
Point3D = namedtuple('Point3D', ['x', 'y', 'z'], defaults=[0])
p = Point3D(1, 2)   # z defaults to 0

# ============ ChainMap: Layered Dict Lookup ============
defaults = {'theme': 'dark', 'language': 'en'}
user_prefs = {'theme': 'light'}
combined = ChainMap(user_prefs, defaults)
print(combined['theme'])     # 'light' (from user_prefs)
print(combined['language'])  # 'en' (from defaults)
```

### Heaps (Priority Queues)

```python
import heapq

"""
heapq: Min-heap implementation using list
- heappush: O(log n)
- heappop: O(log n)  
- heappushpop: O(log n) - more efficient than push then pop
- heapify: O(n) - convert list to heap in-place
- nlargest/nsmallest: O(n log k)
"""

# Basic operations
heap = []
heapq.heappush(heap, 5)
heapq.heappush(heap, 3)
heapq.heappush(heap, 7)
heapq.heappush(heap, 1)

print(heap[0])           # 1 (peek at min)
print(heapq.heappop(heap))  # 1 (remove and return min)

# Heapify existing list
nums = [5, 3, 7, 1, 9, 2]
heapq.heapify(nums)      # In-place, O(n)

# Max heap trick: negate values
max_heap = []
for num in [5, 3, 7, 1]:
    heapq.heappush(max_heap, -num)
largest = -heapq.heappop(max_heap)  # 7

# n largest/smallest
nums = [5, 3, 7, 1, 9, 2, 8, 4, 6]
print(heapq.nlargest(3, nums))   # [9, 8, 7]
print(heapq.nsmallest(3, nums))  # [1, 2, 3]

# With key function
people = [('Alice', 25), ('Bob', 30), ('Charlie', 20)]
oldest = heapq.nlargest(2, people, key=lambda x: x[1])

# Merge sorted iterables
list1 = [1, 4, 7]
list2 = [2, 5, 8]
list3 = [3, 6, 9]
merged = list(heapq.merge(list1, list2, list3))  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Custom objects in heap (use tuples for priority)
tasks = []
heapq.heappush(tasks, (2, 'medium priority'))
heapq.heappush(tasks, (1, 'high priority'))
heapq.heappush(tasks, (3, 'low priority'))

# Or use dataclass with comparison
from dataclasses import dataclass, field

@dataclass(order=True)
class Task:
    priority: int
    name: str = field(compare=False)  # Don't compare by name
    
task_heap = []
heapq.heappush(task_heap, Task(2, 'task2'))
heapq.heappush(task_heap, Task(1, 'task1'))
```

---

## 3. Complexity Analysis Refresher {#3-complexity-analysis}

### Big O Cheat Sheet

```
┌─────────────────────────────────────────────────────────────────────┐
│                    TIME COMPLEXITY REFERENCE                        │
├─────────────────┬───────────────────────────────────────────────────┤
│  O(1)           │  Hash lookup, array index, push/pop              │
│  O(log n)       │  Binary search, balanced tree operations         │
│  O(n)           │  Linear search, single loop                      │
│  O(n log n)     │  Efficient sorts (merge, quick, heap)            │
│  O(n²)          │  Nested loops, bubble sort                       │
│  O(n³)          │  Triple nested loops, naive matrix multiply      │
│  O(2ⁿ)          │  Subsets, recursive fibonacci                    │
│  O(n!)          │  Permutations                                    │
└─────────────────┴───────────────────────────────────────────────────┘

For n = 1,000,000:
O(1):        1 operation
O(log n):    20 operations
O(n):        1,000,000 operations
O(n log n):  20,000,000 operations
O(n²):       1,000,000,000,000 operations  ← Too slow!
```

### Python Operation Complexities

```python
"""
LIST OPERATIONS
"""
lst = [1, 2, 3, 4, 5]

# O(1)
lst[0]              # Index access
lst[-1]             # Negative index
lst.append(6)       # Append
lst.pop()           # Pop from end
len(lst)            # Length

# O(k)
lst[1:4]            # Slice of k elements
lst[1:4] = [7,8,9]  # Slice assignment

# O(n)
lst.insert(0, 0)    # Insert at beginning
lst.pop(0)          # Pop from beginning
lst.remove(3)       # Remove by value
3 in lst            # Membership check
lst.copy()          # Shallow copy
lst.reverse()       # Reverse in-place
min(lst), max(lst)  # Find min/max
lst.count(3)        # Count occurrences
lst.index(3)        # Find index

# O(n log n)
lst.sort()          # Sort in-place
sorted(lst)         # Return sorted copy

"""
DICT OPERATIONS
"""
d = {'a': 1, 'b': 2, 'c': 3}

# O(1) average
d['a']              # Access
d['d'] = 4          # Insert
del d['a']          # Delete
'a' in d            # Membership

# O(n)
list(d.keys())      # Get all keys
list(d.values())    # Get all values
list(d.items())     # Get all items
d.copy()            # Shallow copy

"""
SET OPERATIONS
"""
s1 = {1, 2, 3}
s2 = {3, 4, 5}

# O(1) average
s1.add(4)           # Add element
s1.remove(4)        # Remove element
3 in s1             # Membership

# O(len(s1) + len(s2))
s1 | s2             # Union
s1 & s2             # Intersection
s1 - s2             # Difference

"""
STRING OPERATIONS
"""
s = "hello"

# O(1)
s[0]                # Index access
len(s)              # Length

# O(n)
s + " world"        # Concatenation (creates new string!)
s.find("ll")        # Find substring
s.replace("l", "L") # Replace
s.split()           # Split

# String concatenation anti-pattern
# BAD: O(n²) - creates new string each iteration
result = ""
for i in range(1000):
    result += str(i)  # DON'T DO THIS

# GOOD: O(n)
result = "".join(str(i) for i in range(1000))
```

### Space Complexity

```python
"""
SPACE COMPLEXITY PATTERNS
"""

# O(1) - Constant space
def find_max(lst):
    max_val = lst[0]  # Single variable
    for num in lst:
        max_val = max(max_val, num)
    return max_val

# O(n) - Linear space
def duplicate_list(lst):
    return lst.copy()  # New list of same size

# O(n) - Recursion depth
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)  # Call stack grows to n

# O(n²) - Matrix
def create_matrix(n):
    return [[0] * n for _ in range(n)]  # n × n matrix

# Tail recursion (Python doesn't optimize, but know the concept)
def factorial_tail(n, acc=1):
    if n <= 1:
        return acc
    return factorial_tail(n - 1, acc * n)  # Tail position
```

---

## 4. Core Algorithm Patterns {#4-algorithm-patterns}

### Pattern 1: Two Pointers

```python
"""
TWO POINTERS: Use when dealing with sorted arrays or when you need to
find a pair/triplet that meets certain criteria.

Types:
1. Opposite direction (start and end)
2. Same direction (slow and fast)
"""

# Type 1: Two Sum (Sorted Array)
def two_sum_sorted(nums: list[int], target: int) -> list[int]:
    """Find two numbers that add up to target."""
    left, right = 0, len(nums) - 1
    
    while left < right:
        current_sum = nums[left] + nums[right]
        
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1   # Need larger sum
        else:
            right -= 1  # Need smaller sum
    
    return []  # No solution

# Type 1: Container With Most Water
def max_area(height: list[int]) -> int:
    """Find max water container between two lines."""
    left, right = 0, len(height) - 1
    max_water = 0
    
    while left < right:
        width = right - left
        h = min(height[left], height[right])
        max_water = max(max_water, width * h)
        
        # Move the shorter line (it's the bottleneck)
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    
    return max_water

# Type 2: Remove Duplicates from Sorted Array
def remove_duplicates(nums: list[int]) -> int:
    """Remove duplicates in-place, return new length."""
    if not nums:
        return 0
    
    slow = 0  # Position to write next unique element
    
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]
    
    return slow + 1

# Type 2: Move Zeros to End
def move_zeros(nums: list[int]) -> None:
    """Move all zeros to end, maintain relative order."""
    slow = 0  # Position for next non-zero
    
    for fast in range(len(nums)):
        if nums[fast] != 0:
            nums[slow], nums[fast] = nums[fast], nums[slow]
            slow += 1

# Three Pointers: 3Sum
def three_sum(nums: list[int]) -> list[list[int]]:
    """Find all unique triplets that sum to zero."""
    nums.sort()
    result = []
    
    for i in range(len(nums) - 2):
        # Skip duplicates for first element
        if i > 0 and nums[i] == nums[i-1]:
            continue
        
        left, right = i + 1, len(nums) - 1
        
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            
            if total == 0:
                result.append([nums[i], nums[left], nums[right]])
                
                # Skip duplicates
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1
                
                left += 1
                right -= 1
            elif total < 0:
                left += 1
            else:
                right -= 1
    
    return result
```

### Pattern 2: Sliding Window

```python
"""
SLIDING WINDOW: Use for subarray/substring problems where you need
to find optimal window satisfying some condition.

Types:
1. Fixed-size window
2. Variable-size window
"""

# Fixed-size: Maximum sum of subarray of size k
def max_sum_subarray(nums: list[int], k: int) -> int:
    """Find max sum of any contiguous subarray of size k."""
    if len(nums) < k:
        return 0
    
    # Initial window
    window_sum = sum(nums[:k])
    max_sum = window_sum
    
    # Slide window
    for i in range(k, len(nums)):
        window_sum += nums[i] - nums[i - k]  # Add new, remove old
        max_sum = max(max_sum, window_sum)
    
    return max_sum

# Variable-size: Minimum Size Subarray Sum
def min_subarray_len(target: int, nums: list[int]) -> int:
    """Find minimal length subarray with sum >= target."""
    left = 0
    current_sum = 0
    min_length = float('inf')
    
    for right in range(len(nums)):
        current_sum += nums[right]
        
        # Shrink window while condition is met
        while current_sum >= target:
            min_length = min(min_length, right - left + 1)
            current_sum -= nums[left]
            left += 1
    
    return min_length if min_length != float('inf') else 0

# Longest Substring Without Repeating Characters
def length_of_longest_substring(s: str) -> int:
    """Find length of longest substring without repeating chars."""
    char_index = {}  # Last seen index of each char
    left = 0
    max_length = 0
    
    for right, char in enumerate(s):
        # If char seen and within current window
        if char in char_index and char_index[char] >= left:
            left = char_index[char] + 1  # Move left past duplicate
        
        char_index[char] = right
        max_length = max(max_length, right - left + 1)
    
    return max_length

# Minimum Window Substring (Classic Hard Problem)
from collections import Counter

def min_window(s: str, t: str) -> str:
    """Find minimum window in s containing all chars of t."""
    if not s or not t:
        return ""
    
    # Count required characters
    required = Counter(t)
    required_count = len(required)  # Unique chars to match
    
    left = 0
    formed = 0  # Unique chars in window with required frequency
    window_counts = {}
    
    result = (float('inf'), 0, 0)  # (length, left, right)
    
    for right, char in enumerate(s):
        # Add char to window
        window_counts[char] = window_counts.get(char, 0) + 1
        
        # Check if this char's frequency matches required
        if char in required and window_counts[char] == required[char]:
            formed += 1
        
        # Try to shrink window
        while left <= right and formed == required_count:
            char = s[left]
            
            # Update result if this window is smaller
            if right - left + 1 < result[0]:
                result = (right - left + 1, left, right)
            
            # Remove from window
            window_counts[char] -= 1
            if char in required and window_counts[char] < required[char]:
                formed -= 1
            
            left += 1
    
    return "" if result[0] == float('inf') else s[result[1]:result[2] + 1]
```

### Pattern 3: Binary Search

```python
"""
BINARY SEARCH: O(log n) search in sorted data.

Key insight: Identify a monotonic property to binary search on.
"""

# Basic binary search
def binary_search(nums: list[int], target: int) -> int:
    """Return index of target, or -1 if not found."""
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = left + (right - left) // 2  # Avoid overflow
        
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

# Find leftmost (first) occurrence
def binary_search_left(nums: list[int], target: int) -> int:
    """Return index of first occurrence, or insertion point."""
    left, right = 0, len(nums)
    
    while left < right:
        mid = left + (right - left) // 2
        
        if nums[mid] < target:
            left = mid + 1
        else:
            right = mid
    
    return left

# Find rightmost (last) occurrence
def binary_search_right(nums: list[int], target: int) -> int:
    """Return index after last occurrence."""
    left, right = 0, len(nums)
    
    while left < right:
        mid = left + (right - left) // 2
        
        if nums[mid] <= target:
            left = mid + 1
        else:
            right = mid
    
    return left

# Using bisect module (preferred in practice)
import bisect

nums = [1, 2, 2, 2, 3, 4, 5]
bisect.bisect_left(nums, 2)   # 1 (first 2)
bisect.bisect_right(nums, 2)  # 4 (after last 2)
bisect.insort(nums, 2.5)      # Insert maintaining order

# Search in Rotated Sorted Array
def search_rotated(nums: list[int], target: int) -> int:
    """Search in a rotated sorted array."""
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if nums[mid] == target:
            return mid
        
        # Determine which half is sorted
        if nums[left] <= nums[mid]:  # Left half is sorted
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:  # Right half is sorted
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    
    return -1

# Binary Search on Answer (Very Common Pattern!)
def koko_eating_bananas(piles: list[int], h: int) -> int:
    """
    Koko can eat k bananas/hour. Find minimum k to finish in h hours.
    Binary search on the answer!
    """
    def can_finish(k: int) -> bool:
        hours_needed = sum((pile + k - 1) // k for pile in piles)  # Ceiling division
        return hours_needed <= h
    
    left, right = 1, max(piles)
    
    while left < right:
        mid = left + (right - left) // 2
        
        if can_finish(mid):
            right = mid  # Try smaller k
        else:
            left = mid + 1  # Need larger k
    
    return left
```

### Pattern 4: BFS & DFS

```python
"""
GRAPH/TREE TRAVERSAL
- BFS: Level-order, shortest path (unweighted)
- DFS: Path finding, cycle detection, topological sort
"""
from collections import deque

# BFS Template
def bfs(graph: dict, start: int) -> list[int]:
    """BFS traversal returning order of visited nodes."""
    visited = set([start])
    queue = deque([start])
    result = []
    
    while queue:
        node = queue.popleft()
        result.append(node)
        
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return result

# DFS Template (Iterative)
def dfs_iterative(graph: dict, start: int) -> list[int]:
    """DFS traversal using stack."""
    visited = set()
    stack = [start]
    result = []
    
    while stack:
        node = stack.pop()
        if node in visited:
            continue
        
        visited.add(node)
        result.append(node)
        
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                stack.append(neighbor)
    
    return result

# DFS Template (Recursive)
def dfs_recursive(graph: dict, start: int, visited: set = None) -> list[int]:
    """DFS traversal using recursion."""
    if visited is None:
        visited = set()
    
    visited.add(start)
    result = [start]
    
    for neighbor in graph.get(start, []):
        if neighbor not in visited:
            result.extend(dfs_recursive(graph, neighbor, visited))
    
    return result

# Level Order Traversal (BFS on Tree)
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def level_order(root: TreeNode) -> list[list[int]]:
    """Return level order traversal as list of lists."""
    if not root:
        return []
    
    result = []
    queue = deque([root])
    
    while queue:
        level_size = len(queue)
        level = []
        
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        result.append(level)
    
    return result

# Shortest Path in Unweighted Graph (BFS)
def shortest_path(graph: dict, start: int, end: int) -> int:
    """Return shortest path length, or -1 if no path."""
    if start == end:
        return 0
    
    visited = set([start])
    queue = deque([(start, 0)])  # (node, distance)
    
    while queue:
        node, dist = queue.popleft()
        
        for neighbor in graph.get(node, []):
            if neighbor == end:
                return dist + 1
            
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, dist + 1))
    
    return -1

# Number of Islands (Grid DFS/BFS)
def num_islands(grid: list[list[str]]) -> int:
    """Count number of islands (connected '1's)."""
    if not grid:
        return 0
    
    rows, cols = len(grid), len(grid[0])
    count = 0
    
    def dfs(r: int, c: int):
        # Boundary check and water check
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':
            return
        
        grid[r][c] = '0'  # Mark as visited
        
        # Explore 4 directions
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
    
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
    
    return count
```

### Pattern 5: Dynamic Programming

```python
"""
DYNAMIC PROGRAMMING: Break problem into overlapping subproblems.

Steps:
1. Define state: What variables define a subproblem?
2. Define recurrence: How do subproblems relate?
3. Define base case: What's the smallest subproblem?
4. Define answer: Which subproblem gives the final answer?
5. Determine order: Bottom-up or top-down?
"""

# Classic: Fibonacci (Top-down with Memoization)
from functools import lru_cache

@lru_cache(maxsize=None)
def fib_memo(n: int) -> int:
    if n <= 1:
        return n
    return fib_memo(n - 1) + fib_memo(n - 2)

# Fibonacci (Bottom-up with Tabulation)
def fib_tab(n: int) -> int:
    if n <= 1:
        return n
    
    dp = [0] * (n + 1)
    dp[1] = 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    
    return dp[n]

# Fibonacci (Space Optimized)
def fib_optimized(n: int) -> int:
    if n <= 1:
        return n
    
    prev2, prev1 = 0, 1
    
    for _ in range(2, n + 1):
        curr = prev1 + prev2
        prev2, prev1 = prev1, curr
    
    return prev1

# Climbing Stairs (1 or 2 steps)
def climb_stairs(n: int) -> int:
    """Number of ways to climb n stairs."""
    if n <= 2:
        return n
    
    prev2, prev1 = 1, 2
    
    for _ in range(3, n + 1):
        curr = prev1 + prev2
        prev2, prev1 = prev1, curr
    
    return prev1

# Coin Change (Minimum coins to make amount)
def coin_change(coins: list[int], amount: int) -> int:
    """Return minimum coins needed, or -1 if impossible."""
    # dp[i] = minimum coins to make amount i
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1

# Longest Common Subsequence
def lcs(text1: str, text2: str) -> int:
    """Find length of longest common subsequence."""
    m, n = len(text1), len(text2)
    
    # dp[i][j] = LCS of text1[:i] and text2[:j]
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    return dp[m][n]

# 0/1 Knapsack
def knapsack(weights: list[int], values: list[int], capacity: int) -> int:
    """Maximum value with given capacity constraint."""
    n = len(weights)
    
    # dp[i][w] = max value using items 0..i-1 with capacity w
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            # Don't take item i-1
            dp[i][w] = dp[i-1][w]
            
            # Take item i-1 (if it fits)
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w], 
                               dp[i-1][w - weights[i-1]] + values[i-1])
    
    return dp[n][capacity]

# Edit Distance (Levenshtein Distance)
def min_distance(word1: str, word2: str) -> int:
    """Minimum operations to transform word1 to word2."""
    m, n = len(word1), len(word2)
    
    # dp[i][j] = min ops to transform word1[:i] to word2[:j]
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    # Base cases
    for i in range(m + 1):
        dp[i][0] = i  # Delete all chars
    for j in range(n + 1):
        dp[0][j] = j  # Insert all chars
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]  # No operation needed
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j],      # Delete
                    dp[i][j-1],      # Insert
                    dp[i-1][j-1]     # Replace
                )
    
    return dp[m][n]

# House Robber (Can't rob adjacent houses)
def rob(nums: list[int]) -> int:
    """Maximum money without robbing adjacent houses."""
    if not nums:
        return 0
    if len(nums) <= 2:
        return max(nums)
    
    prev2, prev1 = nums[0], max(nums[0], nums[1])
    
    for i in range(2, len(nums)):
        curr = max(prev1, prev2 + nums[i])
        prev2, prev1 = prev1, curr
    
    return prev1
```

### Pattern 6: Backtracking

```python
"""
BACKTRACKING: Systematically explore all possibilities, pruning invalid paths.

Template:
1. Make a choice
2. Recurse
3. Undo the choice (backtrack)
"""

# Subsets (Power Set)
def subsets(nums: list[int]) -> list[list[int]]:
    """Generate all subsets."""
    result = []
    
    def backtrack(start: int, current: list[int]):
        result.append(current[:])  # Add copy of current subset
        
        for i in range(start, len(nums)):
            current.append(nums[i])      # Choose
            backtrack(i + 1, current)    # Explore
            current.pop()                 # Un-choose
    
    backtrack(0, [])
    return result

# Permutations
def permutations(nums: list[int]) -> list[list[int]]:
    """Generate all permutations."""
    result = []
    
    def backtrack(current: list[int], remaining: set):
        if not remaining:
            result.append(current[:])
            return
        
        for num in list(remaining):
            current.append(num)
            remaining.remove(num)
            backtrack(current, remaining)
            remaining.add(num)
            current.pop()
    
    backtrack([], set(nums))
    return result

# Permutations (In-place swap method)
def permutations_swap(nums: list[int]) -> list[list[int]]:
    """Generate all permutations using swaps."""
    result = []
    
    def backtrack(first: int):
        if first == len(nums):
            result.append(nums[:])
            return
        
        for i in range(first, len(nums)):
            nums[first], nums[i] = nums[i], nums[first]  # Swap
            backtrack(first + 1)
            nums[first], nums[i] = nums[i], nums[first]  # Swap back
    
    backtrack(0)
    return result

# Combination Sum (Can reuse elements)
def combination_sum(candidates: list[int], target: int) -> list[list[int]]:
    """Find all combinations that sum to target (can reuse)."""
    result = []
    
    def backtrack(start: int, current: list[int], remaining: int):
        if remaining == 0:
            result.append(current[:])
            return
        if remaining < 0:
            return
        
        for i in range(start, len(candidates)):
            current.append(candidates[i])
            backtrack(i, current, remaining - candidates[i])  # Can reuse: pass i
            current.pop()
    
    backtrack(0, [], target)
    return result

# N-Queens
def solve_n_queens(n: int) -> list[list[str]]:
    """Place n queens on n×n board so none attack each other."""
    result = []
    board = [['.'] * n for _ in range(n)]
    
    cols = set()       # Columns with queens
    diag1 = set()      # \ diagonals (row - col)
    diag2 = set()      # / diagonals (row + col)
    
    def backtrack(row: int):
        if row == n:
            result.append([''.join(r) for r in board])
            return
        
        for col in range(n):
            if col in cols or (row - col) in diag1 or (row + col) in diag2:
                continue
            
            # Place queen
            board[row][col] = 'Q'
            cols.add(col)
            diag1.add(row - col)
            diag2.add(row + col)
            
            backtrack(row + 1)
            
            # Remove queen
            board[row][col] = '.'
            cols.remove(col)
            diag1.remove(row - col)
            diag2.remove(row + col)
    
    backtrack(0)
    return result

# Word Search in Grid
def word_search(board: list[list[str]], word: str) -> bool:
    """Check if word exists in grid (horizontal/vertical path)."""
    rows, cols = len(board), len(board[0])
    
    def backtrack(r: int, c: int, idx: int) -> bool:
        if idx == len(word):
            return True
        
        if (r < 0 or r >= rows or c < 0 or c >= cols or 
            board[r][c] != word[idx]):
            return False
        
        # Mark as visited
        temp, board[r][c] = board[r][c], '#'
        
        # Explore 4 directions
        found = (backtrack(r + 1, c, idx + 1) or
                 backtrack(r - 1, c, idx + 1) or
                 backtrack(r, c + 1, idx + 1) or
                 backtrack(r, c - 1, idx + 1))
        
        # Restore
        board[r][c] = temp
        return found
    
    for r in range(rows):
        for c in range(cols):
            if backtrack(r, c, 0):
                return True
    
    return False
```

---

## 5. Advanced Python Features {#5-advanced-python}

### Generators & Iterators

```python
"""
GENERATORS: Lazy evaluation, memory-efficient iteration.
"""

# Generator function (uses yield)
def count_up_to(n: int):
    """Generate numbers from 1 to n."""
    i = 1
    while i <= n:
        yield i
        i += 1

# Usage
for num in count_up_to(5):
    print(num)  # 1, 2, 3, 4, 5

# Generator is exhausted after one iteration
gen = count_up_to(3)
print(list(gen))  # [1, 2, 3]
print(list(gen))  # [] - empty!

# Generator expression (like list comprehension, but lazy)
squares_list = [x**2 for x in range(1000000)]      # Creates list in memory
squares_gen = (x**2 for x in range(1000000))       # Lazy, minimal memory

print(sum(squares_gen))  # Works without storing all values

# Practical example: Reading large files
def read_large_file(file_path: str):
    """Read file line by line without loading entire file."""
    with open(file_path, 'r') as f:
        for line in f:  # File object is already a generator!
            yield line.strip()

# Infinite generator
def fibonacci_generator():
    """Generate infinite Fibonacci sequence."""
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Get first 10 Fibonacci numbers
from itertools import islice
fibs = list(islice(fibonacci_generator(), 10))

# yield from: Delegate to sub-generator
def flatten(nested: list):
    """Flatten nested list using yield from."""
    for item in nested:
        if isinstance(item, list):
            yield from flatten(item)
        else:
            yield item

print(list(flatten([1, [2, 3, [4, 5]], 6])))  # [1, 2, 3, 4, 5, 6]

# Generator send() and close()
def running_average():
    """Generator that accepts values and returns running average."""
    total = 0
    count = 0
    average = None
    
    while True:
        value = yield average
        if value is None:
            break
        total += value
        count += 1
        average = total / count

avg = running_average()
next(avg)           # Prime the generator
avg.send(10)        # Returns 10.0
avg.send(20)        # Returns 15.0
avg.send(30)        # Returns 20.0
avg.close()         # Clean up
```

### Decorators

```python
"""
DECORATORS: Modify or extend function behavior.
"""

from functools import wraps
import time

# Basic decorator
def timer(func):
    """Measure function execution time."""
    @wraps(func)  # Preserves function metadata
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.4f} seconds")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "done"

# Decorator with arguments
def retry(max_attempts: int = 3, delay: float = 1.0):
    """Retry function on exception."""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            attempts = 0
            while attempts < max_attempts:
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    attempts += 1
                    if attempts == max_attempts:
                        raise e
                    time.sleep(delay)
        return wrapper
    return decorator

@retry(max_attempts=3, delay=0.5)
def flaky_api_call():
    import random
    if random.random() < 0.7:
        raise ConnectionError("API failed")
    return "success"

# Memoization decorator
def memoize(func):
    """Cache function results."""
    cache = {}
    
    @wraps(func)
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    return wrapper

@memoize
def expensive_computation(n):
    return sum(i**2 for i in range(n))

# Class decorator
def singleton(cls):
    """Ensure only one instance of class exists."""
    instances = {}
    
    @wraps(cls)
    def wrapper(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    return wrapper

@singleton
class DatabaseConnection:
    def __init__(self, host: str):
        self.host = host

# Multiple decorators (applied bottom-up)
@timer
@retry(max_attempts=2)
def api_call():
    pass

# Equivalent to:
# api_call = timer(retry(max_attempts=2)(api_call))

# Decorator for class methods
def validate_positive(func):
    """Ensure all numeric arguments are positive."""
    @wraps(func)
    def wrapper(self, *args, **kwargs):
        for arg in args:
            if isinstance(arg, (int, float)) and arg < 0:
                raise ValueError("Arguments must be positive")
        return func(self, *args, **kwargs)
    return wrapper

class Calculator:
    @validate_positive
    def sqrt(self, x):
        return x ** 0.5
```

### Context Managers

```python
"""
CONTEXT MANAGERS: Setup/teardown pattern with with statement.
"""

# Using contextlib
from contextlib import contextmanager

@contextmanager
def timer_context():
    """Time a block of code."""
    start = time.time()
    yield
    end = time.time()
    print(f"Block took {end - start:.4f} seconds")

with timer_context():
    time.sleep(0.5)

# Context manager with value
@contextmanager
def open_file(path: str, mode: str = 'r'):
    """Safely open and close file."""
    f = open(path, mode)
    try:
        yield f
    finally:
        f.close()

with open_file('data.txt', 'w') as f:
    f.write('hello')

# Class-based context manager
class DatabaseTransaction:
    """Context manager for database transactions."""
    def __init__(self, connection):
        self.connection = connection
    
    def __enter__(self):
        self.connection.begin()
        return self.connection
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is None:
            self.connection.commit()
        else:
            self.connection.rollback()
        return False  # Don't suppress exceptions

# Reentrant context manager
from contextlib import contextmanager

class LockManager:
    """Reentrant lock context manager."""
    def __init__(self):
        self.lock = threading.RLock()
    
    @contextmanager
    def acquire(self):
        self.lock.acquire()
        try:
            yield
        finally:
            self.lock.release()

# Multiple context managers
from contextlib import ExitStack

def process_files(file_paths: list[str]):
    with ExitStack() as stack:
        files = [stack.enter_context(open(fp)) for fp in file_paths]
        # All files open here, will all be closed when exiting
        for f in files:
            print(f.read())

# Suppress exceptions
from contextlib import suppress

with suppress(FileNotFoundError):
    os.remove('nonexistent.txt')  # Won't raise
```

### Type Hints & Generics

```python
"""
TYPE HINTS: Static type checking, better IDE support.
"""

from typing import (
    List, Dict, Set, Tuple, Optional, Union, Callable, 
    TypeVar, Generic, Protocol, Literal, Final, ClassVar,
    Annotated, get_type_hints
)
from dataclasses import dataclass

# Basic type hints
def greet(name: str) -> str:
    return f"Hello, {name}"

def process(items: list[int]) -> dict[str, int]:
    return {"sum": sum(items), "count": len(items)}

# Optional (can be None)
def find_user(user_id: int) -> Optional[str]:  # Same as str | None
    return None

# Union types
def process_input(data: Union[str, bytes]) -> str:  # Same as str | bytes
    if isinstance(data, bytes):
        return data.decode()
    return data

# Callable
def apply_function(
    func: Callable[[int, int], int],
    a: int, 
    b: int
) -> int:
    return func(a, b)

# TypeVar and Generic
T = TypeVar('T')

def first(items: list[T]) -> T:
    return items[0]

# Generic class
class Stack(Generic[T]):
    def __init__(self):
        self._items: list[T] = []
    
    def push(self, item: T) -> None:
        self._items.append(item)
    
    def pop(self) -> T:
        return self._items.pop()

int_stack: Stack[int] = Stack()
int_stack.push(1)

# Bounded TypeVar
Numeric = TypeVar('Numeric', int, float)

def double(x: Numeric) -> Numeric:
    return x * 2

# Protocol (Structural Typing / Duck Typing)
class Drawable(Protocol):
    def draw(self) -> None: ...

def render(obj: Drawable) -> None:
    obj.draw()

class Circle:
    def draw(self) -> None:
        print("Drawing circle")

render(Circle())  # Works because Circle has draw()

# Literal types
Mode = Literal['r', 'w', 'a']

def open_file(path: str, mode: Mode) -> None:
    pass

# Final (constant)
MAX_SIZE: Final = 100

# ClassVar (shared across instances)
@dataclass
class Counter:
    count: ClassVar[int] = 0
    name: str
    
    def __post_init__(self):
        Counter.count += 1

# TypedDict
from typing import TypedDict

class Movie(TypedDict):
    title: str
    year: int
    rating: float

def process_movie(movie: Movie) -> str:
    return f"{movie['title']} ({movie['year']})"

# Self type (Python 3.11+)
from typing import Self

class Builder:
    def set_name(self, name: str) -> Self:
        self.name = name
        return self
```

---

## 6. Concurrency & Parallelism {#6-concurrency}

### Threading (I/O-bound tasks)

```python
"""
THREADING: Best for I/O-bound tasks (network, file I/O).
GIL limits CPU parallelism, but I/O releases the GIL.
"""

import threading
from concurrent.futures import ThreadPoolExecutor
import time
import requests

# Basic thread
def worker(name: str, delay: float):
    print(f"{name} starting")
    time.sleep(delay)
    print(f"{name} done")

thread = threading.Thread(target=worker, args=("Worker-1", 1.0))
thread.start()
thread.join()  # Wait for completion

# Thread with return value (use queue or future)
from queue import Queue

def worker_with_result(queue: Queue, x: int):
    queue.put(x ** 2)

q = Queue()
t = threading.Thread(target=worker_with_result, args=(q, 5))
t.start()
t.join()
result = q.get()  # 25

# ThreadPoolExecutor (preferred)
def fetch_url(url: str) -> str:
    response = requests.get(url)
    return f"{url}: {len(response.content)} bytes"

urls = [
    "https://python.org",
    "https://google.com",
    "https://github.com",
]

# Execute concurrently
with ThreadPoolExecutor(max_workers=5) as executor:
    # map() returns results in order
    results = list(executor.map(fetch_url, urls))
    
    # submit() returns Future objects
    futures = [executor.submit(fetch_url, url) for url in urls]
    for future in futures:
        print(future.result())  # Blocks until done

# Thread synchronization
lock = threading.Lock()
counter = 0

def increment():
    global counter
    with lock:  # Only one thread at a time
        temp = counter
        time.sleep(0.001)
        counter = temp + 1

threads = [threading.Thread(target=increment) for _ in range(100)]
for t in threads:
    t.start()
for t in threads:
    t.join()
print(counter)  # Always 100 with lock

# RLock (reentrant lock)
rlock = threading.RLock()

def recursive_function(n: int):
    with rlock:  # Same thread can acquire multiple times
        if n > 0:
            recursive_function(n - 1)

# Condition (producer-consumer)
condition = threading.Condition()
buffer = []

def producer():
    for i in range(5):
        with condition:
            buffer.append(i)
            print(f"Produced {i}")
            condition.notify()  # Wake up consumer
        time.sleep(0.1)

def consumer():
    while True:
        with condition:
            while not buffer:
                condition.wait()  # Release lock and wait
            item = buffer.pop(0)
            print(f"Consumed {item}")
        if item == 4:
            break

# Semaphore (limit concurrent access)
semaphore = threading.Semaphore(3)  # Max 3 concurrent

def limited_resource():
    with semaphore:
        print(f"Acquired by {threading.current_thread().name}")
        time.sleep(1)

# Event (simple signaling)
event = threading.Event()

def waiter():
    print("Waiting for event...")
    event.wait()
    print("Event received!")

def setter():
    time.sleep(1)
    event.set()  # Signal the event
```

### Multiprocessing (CPU-bound tasks)

```python
"""
MULTIPROCESSING: True parallelism for CPU-bound tasks.
Each process has its own Python interpreter and GIL.
"""

from multiprocessing import Process, Pool, Queue, Manager, cpu_count
import multiprocessing as mp

# Basic process
def cpu_intensive(n: int) -> int:
    return sum(i ** 2 for i in range(n))

if __name__ == '__main__':  # Required on Windows
    p = Process(target=cpu_intensive, args=(1000000,))
    p.start()
    p.join()

# Pool (preferred for parallel execution)
def square(x: int) -> int:
    return x ** 2

if __name__ == '__main__':
    with Pool(processes=cpu_count()) as pool:
        # map - blocks until all complete
        results = pool.map(square, range(10))
        
        # imap - iterator, results in order
        for result in pool.imap(square, range(10)):
            print(result)
        
        # imap_unordered - iterator, results as completed
        for result in pool.imap_unordered(square, range(10)):
            print(result)
        
        # apply_async - single function call
        future = pool.apply_async(square, (5,))
        print(future.get())  # 25
        
        # starmap - for functions with multiple arguments
        results = pool.starmap(pow, [(2, 3), (3, 4), (4, 5)])

# Sharing data between processes
if __name__ == '__main__':
    # Queue (process-safe)
    queue = Queue()
    
    def producer(q):
        q.put("hello")
    
    def consumer(q):
        print(q.get())
    
    p1 = Process(target=producer, args=(queue,))
    p2 = Process(target=consumer, args=(queue,))
    p1.start()
    p2.start()
    p1.join()
    p2.join()
    
    # Manager (shared state)
    manager = Manager()
    shared_list = manager.list()
    shared_dict = manager.dict()
    
    def worker(lst, d, idx):
        lst.append(idx)
        d[idx] = idx ** 2
    
    processes = []
    for i in range(5):
        p = Process(target=worker, args=(shared_list, shared_dict, i))
        processes.append(p)
        p.start()
    
    for p in processes:
        p.join()
    
    print(list(shared_list))
    print(dict(shared_dict))
```

### Asyncio (Async/Await)

```python
"""
ASYNCIO: Cooperative multitasking for I/O-bound tasks.
Single-threaded, uses event loop.
"""

import asyncio
import aiohttp
import aiofiles

# Basic coroutine
async def say_hello(name: str, delay: float):
    await asyncio.sleep(delay)
    print(f"Hello, {name}")

# Run coroutine
asyncio.run(say_hello("World", 1.0))

# Multiple coroutines concurrently
async def main():
    # Create tasks
    task1 = asyncio.create_task(say_hello("Alice", 1.0))
    task2 = asyncio.create_task(say_hello("Bob", 0.5))
    
    await task1
    await task2

asyncio.run(main())

# Gather - run multiple coroutines, collect results
async def fetch_data(item: int) -> str:
    await asyncio.sleep(0.1)
    return f"data_{item}"

async def main():
    results = await asyncio.gather(
        fetch_data(1),
        fetch_data(2),
        fetch_data(3),
    )
    print(results)  # ['data_1', 'data_2', 'data_3']

# HTTP with aiohttp
async def fetch_url(session, url):
    async with session.get(url) as response:
        return await response.text()

async def fetch_all(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_url(session, url) for url in urls]
        return await asyncio.gather(*tasks)

# File I/O with aiofiles
async def read_file(path):
    async with aiofiles.open(path, 'r') as f:
        return await f.read()

# Timeout
async def main():
    try:
        result = await asyncio.wait_for(
            slow_operation(),
            timeout=5.0
        )
    except asyncio.TimeoutError:
        print("Operation timed out")

# Semaphore (limit concurrency)
semaphore = asyncio.Semaphore(10)  # Max 10 concurrent

async def fetch_with_limit(url):
    async with semaphore:
        return await fetch_url(url)

# Queue (async producer-consumer)
async def producer(queue):
    for i in range(5):
        await queue.put(i)
        print(f"Produced {i}")
        await asyncio.sleep(0.1)

async def consumer(queue):
    while True:
        item = await queue.get()
        print(f"Consumed {item}")
        queue.task_done()

async def main():
    queue = asyncio.Queue()
    
    # Start producer and consumer
    producer_task = asyncio.create_task(producer(queue))
    consumer_task = asyncio.create_task(consumer(queue))
    
    await producer_task
    await queue.join()  # Wait until all items processed
    consumer_task.cancel()

# Run in existing event loop (e.g., Jupyter)
import nest_asyncio
nest_asyncio.apply()
asyncio.run(main())

# Mixing sync and async
from concurrent.futures import ThreadPoolExecutor

async def run_blocking(func, *args):
    """Run blocking function in thread pool."""
    loop = asyncio.get_event_loop()
    executor = ThreadPoolExecutor()
    return await loop.run_in_executor(executor, func, *args)

async def main():
    result = await run_blocking(time.sleep, 1)  # Run sync sleep async
```

---

## 7. Object-Oriented Design {#7-oop-design}

### SOLID Principles

```python
"""
S - Single Responsibility Principle
O - Open/Closed Principle
L - Liskov Substitution Principle
I - Interface Segregation Principle
D - Dependency Inversion Principle
"""

from abc import ABC, abstractmethod
from typing import Protocol

# ============ Single Responsibility ============
# BAD: Class does too many things
class UserBad:
    def __init__(self, name, email):
        self.name = name
        self.email = email
    
    def save_to_database(self):  # Persistence logic
        pass
    
    def send_email(self):  # Email logic
        pass
    
    def generate_report(self):  # Reporting logic
        pass

# GOOD: Separate concerns
class User:
    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email

class UserRepository:
    def save(self, user: User): pass
    def load(self, user_id: int) -> User: pass

class EmailService:
    def send(self, user: User, message: str): pass

class UserReportGenerator:
    def generate(self, user: User) -> str: pass


# ============ Open/Closed Principle ============
# Open for extension, closed for modification

# BAD: Must modify class to add new shapes
class AreaCalculatorBad:
    def calculate(self, shape):
        if shape.type == "circle":
            return 3.14 * shape.radius ** 2
        elif shape.type == "rectangle":
            return shape.width * shape.height
        # Must add new elif for each shape!

# GOOD: Extend without modifying
class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass

class Circle(Shape):
    def __init__(self, radius: float):
        self.radius = radius
    
    def area(self) -> float:
        return 3.14 * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, width: float, height: float):
        self.width = width
        self.height = height
    
    def area(self) -> float:
        return self.width * self.height

# Add new shapes without touching existing code
class Triangle(Shape):
    def __init__(self, base: float, height: float):
        self.base = base
        self.height = height
    
    def area(self) -> float:
        return 0.5 * self.base * self.height


# ============ Liskov Substitution Principle ============
# Subtypes must be substitutable for their base types

# BAD: Square violates LSP
class RectangleBad:
    def __init__(self, width: float, height: float):
        self._width = width
        self._height = height
    
    @property
    def width(self) -> float:
        return self._width
    
    @width.setter
    def width(self, value: float):
        self._width = value
    
    @property
    def height(self) -> float:
        return self._height
    
    @height.setter
    def height(self, value: float):
        self._height = value

class SquareBad(RectangleBad):
    @RectangleBad.width.setter
    def width(self, value: float):
        self._width = self._height = value  # Breaks expectations!
    
    @RectangleBad.height.setter  
    def height(self, value: float):
        self._width = self._height = value

# GOOD: Use composition or separate hierarchy
class Shape(ABC):
    @abstractmethod
    def area(self) -> float: pass

class RectangleGood(Shape):
    def __init__(self, width: float, height: float):
        self.width = width
        self.height = height
    
    def area(self) -> float:
        return self.width * self.height

class SquareGood(Shape):
    def __init__(self, side: float):
        self.side = side
    
    def area(self) -> float:
        return self.side ** 2


# ============ Interface Segregation Principle ============
# Clients shouldn't depend on interfaces they don't use

# BAD: Fat interface
class WorkerBad(ABC):
    @abstractmethod
    def work(self): pass
    
    @abstractmethod
    def eat(self): pass
    
    @abstractmethod
    def sleep(self): pass

class RobotBad(WorkerBad):
    def work(self): pass
    def eat(self): pass  # Robots don't eat!
    def sleep(self): pass  # Robots don't sleep!

# GOOD: Segregated interfaces
class Workable(ABC):
    @abstractmethod
    def work(self): pass

class Eatable(ABC):
    @abstractmethod
    def eat(self): pass

class Sleepable(ABC):
    @abstractmethod
    def sleep(self): pass

class Human(Workable, Eatable, Sleepable):
    def work(self): pass
    def eat(self): pass
    def sleep(self): pass

class Robot(Workable):
    def work(self): pass


# ============ Dependency Inversion Principle ============
# Depend on abstractions, not concretions

# BAD: High-level module depends on low-level module
class MySQLDatabaseBad:
    def query(self, sql: str): pass

class UserServiceBad:
    def __init__(self):
        self.database = MySQLDatabaseBad()  # Tightly coupled!
    
    def get_user(self, user_id: int):
        return self.database.query(f"SELECT * FROM users WHERE id = {user_id}")

# GOOD: Both depend on abstraction
class Database(Protocol):
    def query(self, sql: str) -> list: ...

class MySQLDatabase:
    def query(self, sql: str) -> list:
        pass

class PostgreSQLDatabase:
    def query(self, sql: str) -> list:
        pass

class UserService:
    def __init__(self, database: Database):
        self.database = database  # Inject dependency
    
    def get_user(self, user_id: int):
        return self.database.query(f"SELECT * FROM users WHERE id = {user_id}")

# Now easy to swap implementations
mysql_service = UserService(MySQLDatabase())
postgres_service = UserService(PostgreSQLDatabase())
```

### Design Patterns

```python
"""
COMMON DESIGN PATTERNS
"""

# ============ Singleton ============
class Singleton:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

# Or use decorator (shown earlier)
# Or use module (Python modules are singletons)


# ============ Factory ============
class Animal(ABC):
    @abstractmethod
    def speak(self) -> str: pass

class Dog(Animal):
    def speak(self) -> str:
        return "Woof!"

class Cat(Animal):
    def speak(self) -> str:
        return "Meow!"

class AnimalFactory:
    @staticmethod
    def create(animal_type: str) -> Animal:
        if animal_type == "dog":
            return Dog()
        elif animal_type == "cat":
            return Cat()
        raise ValueError(f"Unknown animal: {animal_type}")


# ============ Strategy ============
class SortStrategy(ABC):
    @abstractmethod
    def sort(self, data: list) -> list: pass

class QuickSort(SortStrategy):
    def sort(self, data: list) -> list:
        return sorted(data)  # Using built-in for simplicity

class BubbleSort(SortStrategy):
    def sort(self, data: list) -> list:
        data = data.copy()
        n = len(data)
        for i in range(n):
            for j in range(n - i - 1):
                if data[j] > data[j + 1]:
                    data[j], data[j + 1] = data[j + 1], data[j]
        return data

class Sorter:
    def __init__(self, strategy: SortStrategy):
        self.strategy = strategy
    
    def sort(self, data: list) -> list:
        return self.strategy.sort(data)

sorter = Sorter(QuickSort())
sorter.sort([3, 1, 4, 1, 5])


# ============ Observer ============
class Observer(ABC):
    @abstractmethod
    def update(self, message: str): pass

class Subject:
    def __init__(self):
        self._observers: list[Observer] = []
    
    def attach(self, observer: Observer):
        self._observers.append(observer)
    
    def detach(self, observer: Observer):
        self._observers.remove(observer)
    
    def notify(self, message: str):
        for observer in self._observers:
            observer.update(message)

class EmailNotifier(Observer):
    def update(self, message: str):
        print(f"Email: {message}")

class SMSNotifier(Observer):
    def update(self, message: str):
        print(f"SMS: {message}")


# ============ Decorator Pattern ============
class Coffee(ABC):
    @abstractmethod
    def cost(self) -> float: pass
    
    @abstractmethod
    def description(self) -> str: pass

class SimpleCoffee(Coffee):
    def cost(self) -> float:
        return 2.0
    
    def description(self) -> str:
        return "Coffee"

class CoffeeDecorator(Coffee):
    def __init__(self, coffee: Coffee):
        self._coffee = coffee

class MilkDecorator(CoffeeDecorator):
    def cost(self) -> float:
        return self._coffee.cost() + 0.5
    
    def description(self) -> str:
        return f"{self._coffee.description()} + Milk"

class SugarDecorator(CoffeeDecorator):
    def cost(self) -> float:
        return self._coffee.cost() + 0.2
    
    def description(self) -> str:
        return f"{self._coffee.description()} + Sugar"

# Usage
coffee = SimpleCoffee()
coffee = MilkDecorator(coffee)
coffee = SugarDecorator(coffee)
print(coffee.description())  # Coffee + Milk + Sugar
print(coffee.cost())         # 2.7
```

---

## 8. LeetCode Patterns & Solutions {#8-leetcode-patterns}

### Must-Know Problems by Pattern

```python
"""
ESSENTIAL LEETCODE PROBLEMS BY PATTERN
Each solution includes detailed explanation.
"""

# ============ Array / Two Pointers ============

# 1. Two Sum (Hash Map approach)
def two_sum(nums: list[int], target: int) -> list[int]:
    """
    Time: O(n), Space: O(n)
    Store complement in hash map.
    """
    seen = {}  # num -> index
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    
    return []

# 15. 3Sum
def three_sum(nums: list[int]) -> list[list[int]]:
    """
    Time: O(n²), Space: O(1) excluding output
    Sort + two pointers for each element.
    """
    nums.sort()
    result = []
    
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i-1]:  # Skip duplicates
            continue
        
        left, right = i + 1, len(nums) - 1
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            if total == 0:
                result.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left+1]:
                    left += 1
                while left < right and nums[right] == nums[right-1]:
                    right -= 1
                left += 1
                right -= 1
            elif total < 0:
                left += 1
            else:
                right -= 1
    
    return result

# 11. Container With Most Water
def max_area(height: list[int]) -> int:
    """
    Time: O(n), Space: O(1)
    Move pointer of shorter line inward.
    """
    left, right = 0, len(height) - 1
    max_water = 0
    
    while left < right:
        width = right - left
        h = min(height[left], height[right])
        max_water = max(max_water, width * h)
        
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    
    return max_water


# ============ Linked List ============

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# 206. Reverse Linked List
def reverse_list(head: ListNode) -> ListNode:
    """
    Time: O(n), Space: O(1)
    Three pointers: prev, curr, next
    """
    prev = None
    curr = head
    
    while curr:
        next_temp = curr.next  # Save next
        curr.next = prev       # Reverse link
        prev = curr            # Move prev forward
        curr = next_temp       # Move curr forward
    
    return prev

# 21. Merge Two Sorted Lists
def merge_two_lists(l1: ListNode, l2: ListNode) -> ListNode:
    """
    Time: O(m+n), Space: O(1)
    Use dummy node to simplify edge cases.
    """
    dummy = ListNode()
    current = dummy
    
    while l1 and l2:
        if l1.val <= l2.val:
            current.next = l1
            l1 = l1.next
        else:
            current.next = l2
            l2 = l2.next
        current = current.next
    
    current.next = l1 or l2  # Append remaining
    return dummy.next

# 141. Linked List Cycle (Floyd's Algorithm)
def has_cycle(head: ListNode) -> bool:
    """
    Time: O(n), Space: O(1)
    Fast and slow pointer - they meet if cycle exists.
    """
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    
    return False

# 142. Linked List Cycle II (Find cycle start)
def detect_cycle(head: ListNode) -> ListNode:
    """
    Time: O(n), Space: O(1)
    After meeting, move one pointer to head.
    They meet at cycle start.
    """
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            break
    else:
        return None  # No cycle
    
    slow = head
    while slow != fast:
        slow = slow.next
        fast = fast.next
    
    return slow


# ============ Tree ============

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# 104. Maximum Depth of Binary Tree
def max_depth(root: TreeNode) -> int:
    """
    Time: O(n), Space: O(h) for recursion stack
    DFS approach.
    """
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))

# 226. Invert Binary Tree
def invert_tree(root: TreeNode) -> TreeNode:
    """
    Time: O(n), Space: O(h)
    Swap children recursively.
    """
    if not root:
        return None
    
    root.left, root.right = root.right, root.left
    invert_tree(root.left)
    invert_tree(root.right)
    
    return root

# 98. Validate Binary Search Tree
def is_valid_bst(root: TreeNode) -> bool:
    """
    Time: O(n), Space: O(h)
    Track valid range for each node.
    """
    def validate(node: TreeNode, low: float, high: float) -> bool:
        if not node:
            return True
        if not (low < node.val < high):
            return False
        return (validate(node.left, low, node.val) and 
                validate(node.right, node.val, high))
    
    return validate(root, float('-inf'), float('inf'))

# 236. Lowest Common Ancestor
def lowest_common_ancestor(root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
    """
    Time: O(n), Space: O(h)
    If both p and q are in subtree, current node is LCA.
    """
    if not root or root == p or root == q:
        return root
    
    left = lowest_common_ancestor(root.left, p, q)
    right = lowest_common_ancestor(root.right, p, q)
    
    if left and right:
        return root  # p and q are on different sides
    
    return left or right


# ============ Dynamic Programming ============

# 70. Climbing Stairs
def climb_stairs(n: int) -> int:
    """
    Time: O(n), Space: O(1)
    dp[i] = dp[i-1] + dp[i-2]
    """
    if n <= 2:
        return n
    
    prev2, prev1 = 1, 2
    for _ in range(3, n + 1):
        curr = prev1 + prev2
        prev2, prev1 = prev1, curr
    
    return prev1

# 322. Coin Change
def coin_change(coins: list[int], amount: int) -> int:
    """
    Time: O(amount * coins), Space: O(amount)
    dp[i] = min coins to make amount i
    """
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1

# 300. Longest Increasing Subsequence
def length_of_lis(nums: list[int]) -> int:
    """
    Time: O(n log n), Space: O(n)
    Binary search approach - maintain smallest tail for each length.
    """
    tails = []  # tails[i] = smallest tail of LIS with length i+1
    
    for num in nums:
        # Find position to replace or extend
        left, right = 0, len(tails)
        while left < right:
            mid = (left + right) // 2
            if tails[mid] < num:
                left = mid + 1
            else:
                right = mid
        
        if left == len(tails):
            tails.append(num)  # Extend
        else:
            tails[left] = num  # Replace
    
    return len(tails)

# 1143. Longest Common Subsequence
def longest_common_subsequence(text1: str, text2: str) -> int:
    """
    Time: O(m*n), Space: O(n) with optimization
    Classic 2D DP.
    """
    m, n = len(text1), len(text2)
    prev = [0] * (n + 1)
    
    for i in range(1, m + 1):
        curr = [0] * (n + 1)
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                curr[j] = prev[j-1] + 1
            else:
                curr[j] = max(prev[j], curr[j-1])
        prev = curr
    
    return prev[n]


# ============ Graph ============

# 200. Number of Islands
def num_islands(grid: list[list[str]]) -> int:
    """
    Time: O(m*n), Space: O(m*n) for recursion
    DFS to mark connected components.
    """
    if not grid:
        return 0
    
    rows, cols = len(grid), len(grid[0])
    count = 0
    
    def dfs(r: int, c: int):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':
            return
        grid[r][c] = '0'  # Mark visited
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
    
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
    
    return count

# 207. Course Schedule (Cycle Detection)
def can_finish(num_courses: int, prerequisites: list[list[int]]) -> bool:
    """
    Time: O(V+E), Space: O(V+E)
    Topological sort with cycle detection.
    """
    graph = defaultdict(list)
    for course, prereq in prerequisites:
        graph[prereq].append(course)
    
    # 0: unvisited, 1: visiting, 2: visited
    state = [0] * num_courses
    
    def has_cycle(course: int) -> bool:
        if state[course] == 1:  # Currently visiting -> cycle!
            return True
        if state[course] == 2:  # Already processed
            return False
        
        state[course] = 1
        for next_course in graph[course]:
            if has_cycle(next_course):
                return True
        state[course] = 2
        return False
    
    for course in range(num_courses):
        if has_cycle(course):
            return False
    
    return True


# ============ Binary Search ============

# 33. Search in Rotated Sorted Array
def search(nums: list[int], target: int) -> int:
    """
    Time: O(log n), Space: O(1)
    Determine which half is sorted.
    """
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if nums[mid] == target:
            return mid
        
        if nums[left] <= nums[mid]:  # Left half sorted
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:  # Right half sorted
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    
    return -1

# 153. Find Minimum in Rotated Sorted Array
def find_min(nums: list[int]) -> int:
    """
    Time: O(log n), Space: O(1)
    Binary search for rotation point.
    """
    left, right = 0, len(nums) - 1
    
    while left < right:
        mid = (left + right) // 2
        
        if nums[mid] > nums[right]:
            left = mid + 1  # Min is in right half
        else:
            right = mid  # Min is in left half (including mid)
    
    return nums[left]


# ============ Heap / Priority Queue ============

# 215. Kth Largest Element
def find_kth_largest(nums: list[int], k: int) -> int:
    """
    Time: O(n log k), Space: O(k)
    Maintain min-heap of size k.
    """
    min_heap = []
    
    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap)
    
    return min_heap[0]

# 23. Merge K Sorted Lists
def merge_k_lists(lists: list[ListNode]) -> ListNode:
    """
    Time: O(N log k), Space: O(k)
    Use heap to always pick smallest head.
    """
    heap = []
    
    # Add first node of each list
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst.val, i, lst))
    
    dummy = ListNode()
    current = dummy
    
    while heap:
        val, i, node = heapq.heappop(heap)
        current.next = node
        current = current.next
        
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    
    return dummy.next


# ============ Sliding Window ============

# 3. Longest Substring Without Repeating Characters
def length_of_longest_substring(s: str) -> int:
    """
    Time: O(n), Space: O(min(m,n)) where m is charset size
    Sliding window with hash map.
    """
    char_index = {}
    left = max_length = 0
    
    for right, char in enumerate(s):
        if char in char_index and char_index[char] >= left:
            left = char_index[char] + 1
        char_index[char] = right
        max_length = max(max_length, right - left + 1)
    
    return max_length

# 76. Minimum Window Substring
def min_window(s: str, t: str) -> str:
    """
    Time: O(m+n), Space: O(m+n)
    Expand window until valid, then contract.
    """
    if not s or not t:
        return ""
    
    required = Counter(t)
    required_count = len(required)
    formed = 0
    
    window_counts = {}
    left = 0
    result = (float('inf'), 0, 0)
    
    for right, char in enumerate(s):
        window_counts[char] = window_counts.get(char, 0) + 1
        
        if char in required and window_counts[char] == required[char]:
            formed += 1
        
        while left <= right and formed == required_count:
            if right - left + 1 < result[0]:
                result = (right - left + 1, left, right)
            
            left_char = s[left]
            window_counts[left_char] -= 1
            if left_char in required and window_counts[left_char] < required[left_char]:
                formed -= 1
            left += 1
    
    return "" if result[0] == float('inf') else s[result[1]:result[2] + 1]
```

---

## 9. System Design in Python {#9-system-design}

### Rate Limiter

```python
"""
RATE LIMITER: Token Bucket Algorithm
"""

import time
import threading
from dataclasses import dataclass

@dataclass
class TokenBucket:
    """
    Token Bucket Rate Limiter
    - Tokens added at fixed rate
    - Requests consume tokens
    - Allows burst up to bucket capacity
    """
    capacity: int           # Max tokens
    refill_rate: float      # Tokens per second
    tokens: float = None
    last_update: float = None
    lock: threading.Lock = None
    
    def __post_init__(self):
        self.tokens = float(self.capacity)
        self.last_update = time.time()
        self.lock = threading.Lock()
    
    def _refill(self):
        """Add tokens based on elapsed time."""
        now = time.time()
        elapsed = now - self.last_update
        self.tokens = min(
            self.capacity,
            self.tokens + elapsed * self.refill_rate
        )
        self.last_update = now
    
    def allow_request(self, tokens: int = 1) -> bool:
        """Check if request is allowed."""
        with self.lock:
            self._refill()
            if self.tokens >= tokens:
                self.tokens -= tokens
                return True
            return False

# Usage
limiter = TokenBucket(capacity=10, refill_rate=1.0)  # 10 tokens, 1/sec

for i in range(15):
    if limiter.allow_request():
        print(f"Request {i}: Allowed")
    else:
        print(f"Request {i}: Denied")
    time.sleep(0.1)


# Sliding Window Rate Limiter
class SlidingWindowRateLimiter:
    """
    Fixed window with sliding window counter
    More accurate than fixed window alone.
    """
    def __init__(self, max_requests: int, window_seconds: int):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests = {}  # user_id -> deque of timestamps
        self.lock = threading.Lock()
    
    def allow_request(self, user_id: str) -> bool:
        with self.lock:
            now = time.time()
            
            if user_id not in self.requests:
                self.requests[user_id] = deque()
            
            user_requests = self.requests[user_id]
            
            # Remove old requests outside window
            window_start = now - self.window_seconds
            while user_requests and user_requests[0] < window_start:
                user_requests.popleft()
            
            if len(user_requests) < self.max_requests:
                user_requests.append(now)
                return True
            
            return False
```

### LRU Cache

```python
"""
LRU CACHE: Least Recently Used
"""

from collections import OrderedDict

class LRUCache:
    """
    LRU Cache using OrderedDict
    O(1) get and put operations.
    """
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()
    
    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        # Move to end (most recently used)
        self.cache.move_to_end(key)
        return self.cache[key]
    
    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)  # Remove oldest

# Manual implementation with doubly linked list
class Node:
    def __init__(self, key: int = 0, val: int = 0):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None

class LRUCacheManual:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}  # key -> Node
        
        # Dummy head and tail
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head
    
    def _add_to_head(self, node: Node):
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node
    
    def _remove_node(self, node: Node):
        node.prev.next = node.next
        node.next.prev = node.prev
    
    def _move_to_head(self, node: Node):
        self._remove_node(node)
        self._add_to_head(node)
    
    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        node = self.cache[key]
        self._move_to_head(node)
        return node.val
    
    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            node = self.cache[key]
            node.val = value
            self._move_to_head(node)
        else:
            node = Node(key, value)
            self.cache[key] = node
            self._add_to_head(node)
            
            if len(self.cache) > self.capacity:
                lru = self.tail.prev
                self._remove_node(lru)
                del self.cache[lru.key]
```

### URL Shortener

```python
"""
URL SHORTENER: Design and Implementation
"""

import hashlib
import string
import random

class URLShortener:
    """
    Simple URL shortener with base62 encoding.
    """
    BASE62 = string.ascii_letters + string.digits
    
    def __init__(self):
        self.url_to_code = {}
        self.code_to_url = {}
        self.counter = 0
    
    def _encode(self, num: int) -> str:
        """Convert number to base62 string."""
        if num == 0:
            return self.BASE62[0]
        
        result = []
        while num:
            result.append(self.BASE62[num % 62])
            num //= 62
        return ''.join(reversed(result))
    
    def _decode(self, code: str) -> int:
        """Convert base62 string to number."""
        num = 0
        for char in code:
            num = num * 62 + self.BASE62.index(char)
        return num
    
    def shorten(self, url: str) -> str:
        """Create short URL."""
        if url in self.url_to_code:
            return self.url_to_code[url]
        
        self.counter += 1
        code = self._encode(self.counter)
        
        self.url_to_code[url] = code
        self.code_to_url[code] = url
        
        return f"https://short.url/{code}"
    
    def resolve(self, short_url: str) -> str:
        """Resolve short URL to original."""
        code = short_url.split('/')[-1]
        return self.code_to_url.get(code, "")

# Distributed URL shortener considerations:
# 1. Use distributed counter (ZooKeeper, Redis INCR)
# 2. Hash collision handling
# 3. Database sharding by code prefix
# 4. Caching popular URLs (Redis)
# 5. Analytics tracking
```

---

## 10. Senior-Level Interview Questions {#10-senior-questions}

### Behavioral / Technical Discussion Questions

```
Q: Walk me through how Python's garbage collection works.

A: Python uses reference counting as its primary GC mechanism. Each 
object has a reference count that's incremented when a reference is 
created and decremented when deleted. When count reaches zero, memory 
is freed immediately.

However, reference counting can't handle cycles (A references B, B 
references A). So Python has a generational garbage collector that 
periodically scans for and collects unreachable cycles. Objects are 
grouped into three generations - young objects are collected more 
frequently. The GC can be controlled via the `gc` module.

For production, I'd mention:
- Use __slots__ for memory-critical classes
- Be careful with circular references in closures
- Profile with tracemalloc for memory issues
```

```
Q: How would you optimize a slow Python application?

A: I'd approach this systematically:

1. PROFILE FIRST: Use cProfile or py-spy to identify bottlenecks.
   Never optimize blindly.

2. ALGORITHMIC IMPROVEMENTS: 
   - Check time complexity (O(n²) → O(n log n))
   - Use appropriate data structures (list search → set/dict)

3. PYTHON-SPECIFIC:
   - Replace loops with vectorized operations (NumPy)
   - Use list/dict comprehensions over manual loops
   - Cache with @lru_cache for repeated computations
   - Use generators for large data (memory efficiency)
   - Use slots for classes with many instances

4. CONCURRENCY:
   - I/O-bound: asyncio or threading
   - CPU-bound: multiprocessing

5. EXTERNAL SOLUTIONS:
   - Cython for hot paths
   - PyPy for compatible code
   - Offload to C extensions (NumPy, Pandas)
   - Database query optimization
   - Caching layer (Redis)
```

```
Q: Explain the difference between @staticmethod, @classmethod, and 
regular instance methods.

A: 
- INSTANCE METHOD: Takes `self`, operates on instance. Can access/modify
  instance state and class state.

- CLASSMETHOD: Takes `cls`, operates on class. Used for alternative 
  constructors (e.g., `dict.fromkeys()`). Inherited properly.

- STATICMETHOD: Takes neither. Just a regular function namespaced to 
  the class. Used for utility functions logically grouped with class.

class Date:
    def __init__(self, year, month, day):
        self.year = year
        # ... instance method
    
    @classmethod
    def from_string(cls, date_str):
        # Alternative constructor
        parts = date_str.split('-')
        return cls(int(parts[0]), int(parts[1]), int(parts[2]))
    
    @staticmethod
    def is_valid_date(date_str):
        # Utility - doesn't need instance or class
        parts = date_str.split('-')
        return len(parts) == 3
```

```
Q: How do you handle database migrations in production?

A: Key principles:

1. BACKWARD COMPATIBLE: New code should work with old schema.
   Deploy code first, then migrate.

2. ZERO DOWNTIME:
   - Add columns as nullable or with defaults
   - Never rename columns directly (add new, migrate, drop old)
   - Use feature flags during transition

3. TOOLS: Alembic for SQLAlchemy, Django migrations

4. ROLLBACK PLAN: Every migration should be reversible

Example migration strategy:
# Phase 1: Add new column (nullable)
# Phase 2: Deploy code that writes to both columns
# Phase 3: Backfill old data
# Phase 4: Deploy code that reads from new column
# Phase 5: Drop old column
```

### Code Review Exercise

```python
"""
REVIEW THIS CODE - Find issues and improvements
"""

# Candidate's code to review:
def process_orders(orders):
    results = []
    for order in orders:
        if order["status"] == "pending":
            order["status"] = "processing"
            total = 0
            for item in order["items"]:
                total = total + item["price"] * item["quantity"]
            order["total"] = total
            results.append(order)
    return results

"""
ISSUES TO IDENTIFY:

1. TYPE HINTS MISSING
   - Add proper type hints for documentation and IDE support

2. MUTATING INPUT
   - Modifying orders in place is dangerous side effect
   - Should create new order objects

3. INEFFICIENT STRING COMPARISON
   - Could use enum for status

4. NO ERROR HANDLING
   - What if order has no "items"?
   - What if item has no "price"?

5. COULD USE COMPREHENSION
   - More Pythonic

IMPROVED VERSION:
"""

from dataclasses import dataclass
from enum import Enum
from typing import Optional

class OrderStatus(Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"

@dataclass
class OrderItem:
    price: float
    quantity: int

@dataclass
class Order:
    status: OrderStatus
    items: list[OrderItem]
    total: Optional[float] = None

def process_orders(orders: list[Order]) -> list[Order]:
    """
    Process pending orders, calculating totals.
    Returns new list without mutating input.
    """
    processed = []
    
    for order in orders:
        if order.status == OrderStatus.PENDING:
            total = sum(
                item.price * item.quantity 
                for item in order.items
            )
            processed.append(Order(
                status=OrderStatus.PROCESSING,
                items=order.items,
                total=total
            ))
    
    return processed
```

---

## Quick Reference

```
COMPLEXITY CHEAT SHEET:
━━━━━━━━━━━━━━━━━━━━━━
O(1)      : Hash lookup, array index
O(log n)  : Binary search, balanced tree ops
O(n)      : Linear scan, hash table build
O(n log n): Efficient sorts
O(n²)     : Nested loops, bubble sort
O(2ⁿ)     : Subsets, naive recursion

PYTHON GOTCHAS:
━━━━━━━━━━━━━━
□ Mutable default arguments (use None)
□ Late binding in closures (use default arg)
□ Integer caching (-5 to 256)
□ String concatenation in loops (use join)
□ GIL limits CPU threading

INTERVIEW PATTERNS:
━━━━━━━━━━━━━━━━━━
□ Two Pointers: Sorted array, pairs
□ Sliding Window: Subarray/substring optimal
□ Binary Search: Sorted data, search on answer
□ BFS: Shortest path, level-order
□ DFS: Path finding, backtracking
□ DP: Optimal substructure + overlapping subproblems
□ Heap: Top K, merge K sorted

SENIOR SIGNALS:
━━━━━━━━━━━━━━
✓ Discuss trade-offs (time vs space)
✓ Ask clarifying questions
✓ Consider edge cases upfront
✓ Mention testing strategy
✓ Discuss production concerns
✓ Know when to use which tool
```

---

Good luck with your interviews! 🚀


