---
title: "TypeScript Crash Course"
summary: "[Type System Fundamentals](#1-type-system-fundamentals)
2. [any vs unknown vs never vs void](#2-any-unknown-never-void)
3. [Type Guards & Narrowing](#3-type-guards-narrowing)
4."
difficulty: advanced
tags:
  - typescript
  - v
  - rust
  - r
  - sql
  - string
  - type
  - number
taxonomy:
  topics:
    - tutorial
    - api-reference
    - architecture
    - best-practices
  subjects:
    - technology
    - artificial-intelligence
source:
  type: manual
  creator: "Anonymous Creator"
  creatorType: session
  createdAt: "2025-12-20T00:30:37.574Z"
  sessionId: "204f13d9-11b6-4c1c-97c4-76b50be079aa"
---
# TypeScript Crash Course
## From Fundamentals to Senior-Level Mastery

---

## Table of Contents

1. [Type System Fundamentals](#1-type-system-fundamentals)
2. [any vs unknown vs never vs void](#2-any-unknown-never-void)
3. [Type Guards & Narrowing](#3-type-guards-narrowing)
4. [Interfaces vs Types](#4-interfaces-vs-types)
5. [Generics Deep Dive](#5-generics)
6. [Utility Types Mastery](#6-utility-types)
7. [Advanced Types](#7-advanced-types)
8. [Conditional Types](#8-conditional-types)
9. [Mapped Types](#9-mapped-types)
10. [Template Literal Types](#10-template-literal-types)
11. [Declaration Merging & Module Augmentation](#11-declaration-merging)
12. [Strict Mode & Compiler Options](#12-strict-mode)
13. [Common Patterns & Anti-Patterns](#13-patterns)
14. [Real-World Scenarios](#14-real-world)
15. [Interview Questions & Answers](#15-interview-questions)

---

## 1. Type System Fundamentals {#1-type-system-fundamentals}

### Primitive Types

```typescript
// Basic primitives
let str: string = "hello";
let num: number = 42;
let bool: boolean = true;
let big: bigint = 100n;
let sym: symbol = Symbol("id");

// null and undefined (different in strict mode!)
let n: null = null;
let u: undefined = undefined;

// Arrays
let nums: number[] = [1, 2, 3];
let strs: Array<string> = ["a", "b", "c"];  // Generic syntax

// Tuples (fixed-length arrays with specific types)
let tuple: [string, number] = ["hello", 42];
let namedTuple: [name: string, age: number] = ["Alice", 30];

// Tuple with rest elements
let mixedTuple: [string, ...number[]] = ["hello", 1, 2, 3];

// readonly tuple
let readonlyTuple: readonly [string, number] = ["hello", 42];
// readonlyTuple[0] = "world"; // Error!
```

### Object Types

```typescript
// Object type annotation
let person: { name: string; age: number } = {
  name: "Alice",
  age: 30
};

// Optional properties
let config: { host: string; port?: number } = {
  host: "localhost"
  // port is optional
};

// Readonly properties
let point: { readonly x: number; readonly y: number } = {
  x: 10,
  y: 20
};
// point.x = 5; // Error!

// Index signatures
let dictionary: { [key: string]: number } = {
  apple: 1,
  banana: 2
};

// Index signature with specific keys
interface StringMap {
  [key: string]: string;
  length: number; // Error! Must be string (compatible with index)
}

// Mixed index signatures
interface MixedMap {
  [key: string]: string | number;
  length: number;  // OK - number is compatible
  name: string;    // OK - string is compatible
}
```

### Function Types

```typescript
// Function type annotation
let add: (a: number, b: number) => number;
add = (x, y) => x + y;  // Parameters inferred from type

// Function declaration with types
function greet(name: string, greeting?: string): string {
  return `${greeting ?? "Hello"}, ${name}!`;
}

// Default parameters
function createUser(name: string, age: number = 18): User {
  return { name, age };
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

// Function overloads
function parse(input: string): string[];
function parse(input: string, limit: number): string[];
function parse(input: string, limit?: number): string[] {
  // Implementation
  return limit ? input.split(",", limit) : input.split(",");
}

// Call signatures (for objects that are callable)
interface ClickHandler {
  (event: MouseEvent): void;
  description: string;
}

// Construct signatures
interface DateConstructor {
  new (value: number): Date;
  (value: number): string;  // Can also be called without new
}

// this parameter (explicit this type)
interface Button {
  label: string;
  onClick(this: Button): void;
}

const button: Button = {
  label: "Submit",
  onClick() {
    console.log(this.label);  // 'this' is typed as Button
  }
};
```

### Literal Types

```typescript
// String literals
let direction: "north" | "south" | "east" | "west";
direction = "north";  // OK
// direction = "up";  // Error!

// Numeric literals
let diceRoll: 1 | 2 | 3 | 4 | 5 | 6;

// Boolean literal (rarely used directly)
let trueOnly: true = true;

// const assertions (infer most specific type)
const config = {
  endpoint: "/api",
  method: "GET"
} as const;
// Type: { readonly endpoint: "/api"; readonly method: "GET" }

// Without as const:
const configMutable = {
  endpoint: "/api",
  method: "GET"
};
// Type: { endpoint: string; method: string }

// Array as const
const colors = ["red", "green", "blue"] as const;
// Type: readonly ["red", "green", "blue"]
type Color = typeof colors[number];  // "red" | "green" | "blue"
```

---

## 2. any vs unknown vs never vs void {#2-any-unknown-never-void}

### The Type Hierarchy

```
                    unknown (top type - all types assignable to it)
                        │
         ┌──────────────┼──────────────┐
         │              │              │
      string         number        object    ... (all other types)
         │              │              │
         └──────────────┼──────────────┘
                        │
                     never (bottom type - assignable to all types)

    any - OPTS OUT of type checking (avoid!)
```

### any: The Escape Hatch (Avoid!)

```typescript
/**
 * any: Disables ALL type checking
 * - Assignable TO anything
 * - Anything assignable FROM it
 * - Basically turns off TypeScript
 */

let anything: any = "hello";
anything = 42;
anything = { foo: "bar" };
anything.nonExistentMethod();  // No error! Runtime crash!

// any is contagious
let num: number = anything;  // No error!
num.toFixed();  // Might crash at runtime

// When any is (somewhat) acceptable:
// 1. Migrating JS to TS (temporary)
// 2. Working with truly dynamic data (prefer unknown)
// 3. Third-party library without types (use @ts-ignore or declare)

// ⚠️ ANTI-PATTERN: Using any to "fix" type errors
function processData(data: any) {  // BAD!
  return data.items.map((i: any) => i.value);
}
```

### unknown: The Type-Safe any

```typescript
/**
 * unknown: Type-safe counterpart to any
 * - Anything assignable TO it
 * - NOT assignable FROM it (without narrowing)
 * - Forces you to check types before using
 */

let value: unknown = "hello";
value = 42;
value = { foo: "bar" };

// CANNOT use unknown directly
// value.toString();  // Error!
// let str: string = value;  // Error!

// MUST narrow the type first
if (typeof value === "string") {
  console.log(value.toUpperCase());  // OK - narrowed to string
}

if (typeof value === "number") {
  console.log(value.toFixed(2));  // OK - narrowed to number
}

// Type assertion (when you know better than TS)
const str = value as string;  // OK but risky
const num = <number>value;    // Same thing, older syntax

// Real-world example: API response
async function fetchData(url: string): Promise<unknown> {
  const response = await fetch(url);
  return response.json();  // We don't know the shape
}

// Usage with type guard
interface User {
  id: number;
  name: string;
}

function isUser(obj: unknown): obj is User {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "name" in obj &&
    typeof (obj as User).id === "number" &&
    typeof (obj as User).name === "string"
  );
}

async function getUser(url: string): Promise<User | null> {
  const data = await fetchData(url);
  return isUser(data) ? data : null;
}
```

### never: The Impossible Type

```typescript
/**
 * never: Represents values that NEVER occur
 * - Function that never returns
 * - Impossible type narrowing
 * - Empty union type
 */

// Function that never returns (throws or infinite loop)
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {
    // ...
  }
}

// Exhaustive checking (THE MOST IMPORTANT USE CASE)
type Shape = "circle" | "square" | "triangle";

function getArea(shape: Shape): number {
  switch (shape) {
    case "circle":
      return Math.PI * 10 * 10;
    case "square":
      return 10 * 10;
    case "triangle":
      return (10 * 10) / 2;
    default:
      // If we handled all cases, shape is never here
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}

// If someone adds "rectangle" to Shape but forgets this function:
// TypeScript ERROR: Type 'rectangle' is not assignable to type 'never'
// This is called "exhaustiveness checking"

// Helper function for exhaustive checks
function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}

// never in conditional types
type NonNullable<T> = T extends null | undefined ? never : T;
type Result = NonNullable<string | null>;  // string

// never is the empty union
type Empty = never;
type Union = string | never;  // string (never disappears)
type Intersection = string & never;  // never (absorbs everything)
```

### void: No Return Value

```typescript
/**
 * void: Function doesn't return anything meaningful
 * - Different from undefined (subtle but important)
 * - Callback return types
 */

// Function with no return
function logMessage(msg: string): void {
  console.log(msg);
  // Implicit return undefined
}

// void vs undefined
function returnsVoid(): void {
  // Can return undefined explicitly or implicitly
  return;
}

function returnsUndefined(): undefined {
  return undefined;  // MUST return undefined
}

// ⚠️ Important: void in callback types allows any return
type Callback = () => void;

const callback: Callback = () => {
  return 42;  // OK! Return value is ignored
};

// This is intentional - allows:
const arr = [1, 2, 3];
arr.forEach((n) => arr.push(n * 2));  // push returns number, but that's fine

// But void variables can only be undefined
let v: void = undefined;
// let v: void = null;  // Error in strict mode
```

### Comparison Table

```typescript
/**
 * COMPARISON: any vs unknown vs never vs void
 * 
 * ┌──────────┬─────────────────┬──────────────────┬─────────────────┐
 * │          │ Assign TO       │ Assign FROM      │ Use Case        │
 * ├──────────┼─────────────────┼──────────────────┼─────────────────┤
 * │ any      │ Anything        │ Anything         │ Escape hatch    │
 * │ unknown  │ Anything        │ Only after check │ Safe any        │
 * │ never    │ Nothing         │ Everything       │ Impossible      │
 * │ void     │ undefined       │ undefined        │ No return       │
 * └──────────┴─────────────────┴──────────────────┴─────────────────┘
 */

// Examples demonstrating the differences
declare const anyVal: any;
declare const unknownVal: unknown;
declare const neverVal: never;
declare const voidVal: void;

// Assigning TO these types
let a1: any = "hello";       // OK
let a2: unknown = "hello";   // OK
// let a3: never = "hello";  // Error - nothing assignable to never
let a4: void = undefined;    // OK

// Assigning FROM these types
let b1: string = anyVal;      // OK (dangerous!)
// let b2: string = unknownVal; // Error - must narrow first
let b3: string = neverVal;    // OK (never is assignable to everything)
// let b4: string = voidVal;    // Error
```

---

## 3. Type Guards & Narrowing {#3-type-guards-narrowing}

### Built-in Type Guards

```typescript
// typeof (primitives)
function processValue(value: string | number) {
  if (typeof value === "string") {
    // value is string here
    console.log(value.toUpperCase());
  } else {
    // value is number here
    console.log(value.toFixed(2));
  }
}

// instanceof (classes)
class Dog {
  bark() { console.log("Woof!"); }
}

class Cat {
  meow() { console.log("Meow!"); }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();  // animal is Dog
  } else {
    animal.meow();  // animal is Cat
  }
}

// in operator (property checking)
interface Fish {
  swim(): void;
}

interface Bird {
  fly(): void;
}

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    animal.swim();  // animal is Fish
  } else {
    animal.fly();   // animal is Bird
  }
}

// Equality narrowing
function compare(x: string | number, y: string | boolean) {
  if (x === y) {
    // x and y are both string (only common type)
    console.log(x.toUpperCase());
    console.log(y.toLowerCase());
  }
}

// Truthiness narrowing
function printLength(str: string | null | undefined) {
  if (str) {
    // str is string (truthy)
    console.log(str.length);
  }
}

// ⚠️ Truthiness gotcha with numbers and strings
function processNumber(n: number | null) {
  if (n) {
    // Excludes 0! Might not be what you want
    console.log(n);
  }
  
  // Better:
  if (n !== null) {
    console.log(n);  // Includes 0
  }
}
```

### Custom Type Guards (Type Predicates)

```typescript
// User-defined type guard with "is" keyword
interface User {
  type: "user";
  name: string;
  email: string;
}

interface Admin {
  type: "admin";
  name: string;
  permissions: string[];
}

// Type predicate: "value is User"
function isUser(value: User | Admin): value is User {
  return value.type === "user";
}

function isAdmin(value: User | Admin): value is Admin {
  return value.type === "admin";
}

function processAccount(account: User | Admin) {
  if (isUser(account)) {
    console.log(account.email);  // TypeScript knows it's User
  } else {
    console.log(account.permissions);  // TypeScript knows it's Admin
  }
}

// Type guard for unknown
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isArrayOfStrings(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every((item) => typeof item === "string")
  );
}

// Generic type guard
function isNotNull<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

const maybeString: string | null = "hello";
if (isNotNull(maybeString)) {
  console.log(maybeString.toUpperCase());  // string, not null
}

// Type guard with assertion function (TS 3.7+)
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Value is not a string");
  }
}

function processInput(input: unknown) {
  assertIsString(input);
  // input is string from here on
  console.log(input.toUpperCase());
}

// Assert non-null
function assertDefined<T>(
  value: T | null | undefined,
  message?: string
): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(message ?? "Value is not defined");
  }
}
```

### Discriminated Unions (Tagged Unions)

```typescript
/**
 * Discriminated Union: Union types with a common literal property
 * THE most important pattern for type-safe state management
 */

// Action types (Redux-style)
type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; data: string[] }
  | { type: "FETCH_ERROR"; error: Error };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      // action.data is available here
      return { ...state, loading: false, data: action.data };
    case "FETCH_ERROR":
      // action.error is available here
      return { ...state, loading: false, error: action.error };
  }
}

// API Response pattern
type ApiResponse<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };

function handleResponse<T>(response: ApiResponse<T>) {
  switch (response.status) {
    case "loading":
      return <Loading />;
    case "success":
      return <Data data={response.data} />;
    case "error":
      return <Error message={response.error} />;
  }
}

// Shape example
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; sideLength: number }
  | { kind: "rectangle"; width: number; height: number };

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
}

// Result type (Rust-style)
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return { ok: false, error: "Division by zero" };
  }
  return { ok: true, value: a / b };
}

const result = divide(10, 2);
if (result.ok) {
  console.log(result.value);  // number
} else {
  console.log(result.error);  // string
}
```

---

## 4. Interfaces vs Types {#4-interfaces-vs-types}

### Key Differences

```typescript
/**
 * INTERFACE vs TYPE: When to use which?
 * 
 * General rule:
 * - Use INTERFACE for object shapes (can be extended/implemented)
 * - Use TYPE for unions, primitives, tuples, complex types
 */

// ============ DECLARATION MERGING (Interface only!) ============

// Interfaces merge automatically
interface User {
  name: string;
}

interface User {
  age: number;
}

// User now has both name and age
const user: User = { name: "Alice", age: 30 };

// Types CANNOT merge (error: Duplicate identifier)
type Person = { name: string };
// type Person = { age: number };  // Error!


// ============ EXTENDS vs INTERSECTION ============

// Interface extends (inheritance)
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// Type intersection (composition)
type AnimalType = { name: string };
type DogType = AnimalType & { breed: string };

// Interface can extend type
interface Cat extends AnimalType {
  meow(): void;
}

// Type can intersect interface
type Bird = Animal & { fly(): void };


// ============ IMPLEMENTS ============

// Both can be implemented by classes
interface Printable {
  print(): void;
}

type Serializable = {
  serialize(): string;
};

class Document implements Printable, Serializable {
  print() { console.log("Printing..."); }
  serialize() { return JSON.stringify(this); }
}


// ============ ONLY TYPE CAN DO ============

// Union types
type StringOrNumber = string | number;
// interface StringOrNumber = string | number;  // Impossible!

// Primitive aliases
type ID = string;
type Callback = () => void;

// Tuple types
type Point = [number, number];
type NamedPoint = [x: number, y: number];

// Mapped types
type Readonly<T> = { readonly [K in keyof T]: T[K] };

// Conditional types
type NonNullable<T> = T extends null | undefined ? never : T;

// Template literal types
type EventName = `on${Capitalize<string>}`;


// ============ ONLY INTERFACE CAN DO ============

// Declaration merging (shown above)
// Useful for extending third-party types


// ============ COMPUTED PROPERTIES ============

// Type can use computed properties directly
type Keys = "name" | "age";
type Person = { [K in Keys]: string };

// Interface needs mapped type helper
type PersonInterface = { [K in Keys]: string };  // This is a type!


// ============ RECURSIVE TYPES ============

// Both work, but syntax differs

// Interface (more natural for objects)
interface TreeNode {
  value: number;
  children: TreeNode[];
}

// Type
type TreeNodeType = {
  value: number;
  children: TreeNodeType[];
};

// Type with union (more flexible)
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };
```

### When to Use What

```typescript
/**
 * DECISION GUIDE:
 * 
 * Use INTERFACE when:
 * ✓ Defining object shapes
 * ✓ Creating public API contracts
 * ✓ Need declaration merging (library augmentation)
 * ✓ Will be implemented by classes
 * ✓ Want extends semantics
 * 
 * Use TYPE when:
 * ✓ Creating unions or intersections
 * ✓ Aliasing primitives
 * ✓ Creating tuple types
 * ✓ Using mapped/conditional types
 * ✓ Need computed properties
 * ✓ Creating complex type expressions
 */

// Example: API design
interface ApiClient {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, body: unknown): Promise<T>;
}

// Example: State management
type LoadingState = 
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: unknown }
  | { status: "error"; error: Error };

// Example: Utility types
type Nullable<T> = T | null;
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Example: Function types
type Handler<T> = (event: T) => void;
type AsyncHandler<T> = (event: T) => Promise<void>;

// Example: Object with specific keys
interface Config {
  apiUrl: string;
  timeout: number;
  retries: number;
}

// Example: Object with dynamic keys
type FeatureFlags = {
  [key: string]: boolean;
};
```

---

## 5. Generics Deep Dive {#5-generics}

### Generic Basics

```typescript
// Generic function
function identity<T>(value: T): T {
  return value;
}

const str = identity("hello");  // Type: string
const num = identity(42);       // Type: number

// Explicit type argument
const explicit = identity<string>("hello");

// Multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const p = pair("hello", 42);  // Type: [string, number]

// Generic interface
interface Container<T> {
  value: T;
  getValue(): T;
}

const strContainer: Container<string> = {
  value: "hello",
  getValue() { return this.value; }
};

// Generic class
class Box<T> {
  constructor(public contents: T) {}
  
  map<U>(fn: (value: T) => U): Box<U> {
    return new Box(fn(this.contents));
  }
}

const numBox = new Box(42);
const strBox = numBox.map(n => n.toString());  // Box<string>

// Generic type alias
type Result<T, E = Error> = 
  | { success: true; value: T }
  | { success: false; error: E };
```

### Generic Constraints

```typescript
// extends keyword for constraints
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

getLength("hello");    // OK - string has length
getLength([1, 2, 3]);  // OK - array has length
// getLength(42);      // Error - number has no length

// Constraining to object keys
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "Alice", age: 30 };
const name = getProperty(person, "name");  // Type: string
const age = getProperty(person, "age");    // Type: number
// getProperty(person, "email");           // Error!

// Multiple constraints (intersection)
interface HasId { id: number; }
interface HasName { name: string; }

function process<T extends HasId & HasName>(item: T): string {
  return `${item.id}: ${item.name}`;
}

// Constraining to constructor
interface Constructor<T = {}> {
  new (...args: any[]): T;
}

function createInstance<T>(ctor: Constructor<T>): T {
  return new ctor();
}

class MyClass {
  value = 42;
}

const instance = createInstance(MyClass);  // Type: MyClass
```

### Generic Inference & Defaults

```typescript
// Type inference in generics
function createArray<T>(item: T, count: number): T[] {
  return Array(count).fill(item);
}

const nums = createArray(0, 5);        // T inferred as number
const strs = createArray("", 5);       // T inferred as string

// Default type parameters
interface ApiResponse<T = unknown> {
  data: T;
  status: number;
}

const response: ApiResponse = { data: {}, status: 200 };  // T is unknown
const userResponse: ApiResponse<User> = { data: user, status: 200 };

// Default with constraint
interface Cache<T extends object = Record<string, unknown>> {
  get(key: string): T | undefined;
  set(key: string, value: T): void;
}

// Contextual typing with generics
const handlers = {
  onClick: (e: MouseEvent) => {},
  onKeyDown: (e: KeyboardEvent) => {}
};

function on<K extends keyof typeof handlers>(
  event: K,
  handler: typeof handlers[K]
) {
  // ...
}

on("onClick", (e) => {});  // e is MouseEvent
on("onKeyDown", (e) => {});  // e is KeyboardEvent
```

### Advanced Generic Patterns

```typescript
// Generic with conditional return type
function processInput<T extends string | number>(
  input: T
): T extends string ? string[] : number {
  if (typeof input === "string") {
    return input.split("") as any;
  }
  return (input * 2) as any;
}

const strResult = processInput("hello");  // string[]
const numResult = processInput(42);       // number

// Factory pattern with generics
interface Factory<T> {
  create(): T;
}

function createFactory<T>(ctor: new () => T): Factory<T> {
  return {
    create: () => new ctor()
  };
}

// Builder pattern
class RequestBuilder<T = unknown> {
  private url = "";
  private method = "GET";
  
  setUrl(url: string): this {
    this.url = url;
    return this;
  }
  
  setMethod(method: string): this {
    this.method = method;
    return this;
  }
  
  // Change the generic type
  withResponse<R>(): RequestBuilder<R> {
    return this as unknown as RequestBuilder<R>;
  }
  
  async execute(): Promise<T> {
    const response = await fetch(this.url, { method: this.method });
    return response.json();
  }
}

const request = new RequestBuilder()
  .setUrl("/api/users")
  .withResponse<User[]>()
  .execute();  // Promise<User[]>

// Curried generic function
function curry<A, B, C>(fn: (a: A, b: B) => C): (a: A) => (b: B) => C {
  return (a) => (b) => fn(a, b);
}

const add = (a: number, b: number) => a + b;
const curriedAdd = curry(add);
const addFive = curriedAdd(5);
const result = addFive(3);  // 8

// Variadic tuple types (rest elements in generics)
function concat<T extends unknown[], U extends unknown[]>(
  arr1: [...T],
  arr2: [...U]
): [...T, ...U] {
  return [...arr1, ...arr2];
}

const result2 = concat([1, 2] as const, ["a", "b"] as const);
// Type: [1, 2, "a", "b"]
```

---

## 6. Utility Types Mastery {#6-utility-types}

### Built-in Utility Types

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  readonly createdAt: Date;
}

// ============ PARTIAL: All properties optional ============
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; age?: number; createdAt?: Date }

function updateUser(id: number, updates: Partial<User>) {
  // Can pass any subset of User properties
}

updateUser(1, { name: "New Name" });  // OK


// ============ REQUIRED: All properties required ============
type RequiredUser = Required<User>;
// { id: number; name: string; email: string; age: number; createdAt: Date }


// ============ READONLY: All properties readonly ============
type ReadonlyUser = Readonly<User>;
// { readonly id: number; readonly name: string; ... }

function freeze<T>(obj: T): Readonly<T> {
  return Object.freeze(obj);
}


// ============ PICK: Select specific properties ============
type UserPreview = Pick<User, "id" | "name">;
// { id: number; name: string }


// ============ OMIT: Remove specific properties ============
type UserWithoutEmail = Omit<User, "email" | "createdAt">;
// { id: number; name: string; age?: number }


// ============ RECORD: Create object type with specific keys ============
type PageInfo = { title: string };
type Page = "home" | "about" | "contact";

type Pages = Record<Page, PageInfo>;
// { home: PageInfo; about: PageInfo; contact: PageInfo }

// Dynamic string keys
type StringMap = Record<string, unknown>;


// ============ EXCLUDE: Remove types from union ============
type T1 = "a" | "b" | "c";
type T2 = Exclude<T1, "a">;  // "b" | "c"
type T3 = Exclude<T1, "a" | "b">;  // "c"

type NonNullableString = Exclude<string | null | undefined, null | undefined>;
// string


// ============ EXTRACT: Keep only matching types ============
type T4 = Extract<T1, "a" | "f">;  // "a"
type T5 = Extract<string | number | boolean, string | boolean>;  // string | boolean


// ============ NONNULLABLE: Remove null and undefined ============
type T6 = NonNullable<string | null | undefined>;  // string


// ============ RETURNTYPE: Get function return type ============
function createUser(name: string, age: number) {
  return { id: Math.random(), name, age };
}

type CreateUserReturn = ReturnType<typeof createUser>;
// { id: number; name: string; age: number }


// ============ PARAMETERS: Get function parameter types ============
type CreateUserParams = Parameters<typeof createUser>;
// [name: string, age: number]


// ============ AWAITED: Unwrap Promise type ============
type PromiseString = Promise<string>;
type AwaitedString = Awaited<PromiseString>;  // string

type NestedPromise = Promise<Promise<number>>;
type AwaitedNested = Awaited<NestedPromise>;  // number


// ============ CONSTRUCTORPARAMETERS ============
class Point {
  constructor(public x: number, public y: number) {}
}

type PointParams = ConstructorParameters<typeof Point>;  // [x: number, y: number]


// ============ INSTANCETYPE ============
type PointInstance = InstanceType<typeof Point>;  // Point


// ============ THISPARAMETERTYPE & OMITTHISPARAMETER ============
function toHex(this: number) {
  return this.toString(16);
}

type ThisType = ThisParameterType<typeof toHex>;  // number
type PureFunction = OmitThisParameter<typeof toHex>;  // () => string
```

### String Manipulation Types

```typescript
// Built-in string manipulation types (TS 4.1+)
type Upper = Uppercase<"hello">;        // "HELLO"
type Lower = Lowercase<"HELLO">;        // "hello"
type Cap = Capitalize<"hello">;         // "Hello"
type Uncap = Uncapitalize<"Hello">;     // "hello"

// Event handler pattern
type EventName = "click" | "scroll" | "mousemove";
type HandlerName = `on${Capitalize<EventName>}`;
// "onClick" | "onScroll" | "onMousemove"

// Getter/setter pattern
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
// { getName: () => string; getAge: () => number }
```

### Building Custom Utility Types

```typescript
// Deep Partial
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface NestedConfig {
  database: {
    host: string;
    port: number;
    credentials: {
      username: string;
      password: string;
    };
  };
}

type PartialConfig = DeepPartial<NestedConfig>;
// All nested properties are also optional

// Deep Readonly
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

// Mutable (remove readonly)
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

// Optional to Required
type RequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

// Make specific keys optional
type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Nullable (allow null for all properties)
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

// Get optional keys
type OptionalKeysOf<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

// Get required keys
type RequiredKeysOf<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

// Filter keys by value type
type KeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

interface Example {
  name: string;
  age: number;
  active: boolean;
  count: number;
}

type StringKeys = KeysOfType<Example, string>;  // "name"
type NumberKeys = KeysOfType<Example, number>;  // "age" | "count"

// Pick by value type
type PickByType<T, V> = Pick<T, KeysOfType<T, V>>;

type OnlyNumbers = PickByType<Example, number>;
// { age: number; count: number }
```

---

## 7. Advanced Types {#7-advanced-types}

### Index Types

```typescript
// keyof - get all keys as union
interface Person {
  name: string;
  age: number;
  email: string;
}

type PersonKeys = keyof Person;  // "name" | "age" | "email"

// Indexed access types
type NameType = Person["name"];           // string
type AgeOrEmail = Person["age" | "email"];  // number | string
type AllValues = Person[keyof Person];    // string | number

// Array index access
const tuple = ["hello", 42, true] as const;
type TupleValues = (typeof tuple)[number];  // "hello" | 42 | true
type FirstElement = (typeof tuple)[0];      // "hello"

// Nested index access
interface Config {
  server: {
    host: string;
    port: number;
  };
  database: {
    url: string;
  };
}

type ServerHost = Config["server"]["host"];  // string

// typeof with index access
const routes = {
  home: "/",
  about: "/about",
  contact: "/contact"
} as const;

type Route = typeof routes[keyof typeof routes];
// "/" | "/about" | "/contact"
```

### Intersection & Union Types

```typescript
// Union: A OR B
type StringOrNumber = string | number;

function process(value: StringOrNumber) {
  // Can only access common properties
  // value.length - Error! number has no length
  
  if (typeof value === "string") {
    console.log(value.length);  // OK
  }
}

// Intersection: A AND B
type Named = { name: string };
type Aged = { age: number };
type Person = Named & Aged;  // { name: string; age: number }

// Intersection with functions
type Logger = (msg: string) => void;
type ErrorHandler = (err: Error) => void;
type Combined = Logger & ErrorHandler;  // Never callable!
// Function intersections result in overloads

// Intersection with conflicting properties
type A = { x: number };
type B = { x: string };
type AB = A & B;  // { x: never } - number & string is never

// Union of object types
type Cat = { meow(): void };
type Dog = { bark(): void };
type Pet = Cat | Dog;

function handlePet(pet: Pet) {
  // pet.meow() - Error! Might be a dog
  // pet.bark() - Error! Might be a cat
  
  if ("meow" in pet) {
    pet.meow();  // OK
  }
}

// Distributive unions
type Wrap<T> = T extends any ? { value: T } : never;
type Distributed = Wrap<string | number>;
// { value: string } | { value: number }
// NOT { value: string | number }
```

### Type Assertions & Casting

```typescript
// as syntax (preferred)
const input = document.getElementById("my-input") as HTMLInputElement;
input.value = "hello";

// Angle bracket syntax (doesn't work in JSX)
const input2 = <HTMLInputElement>document.getElementById("my-input");

// const assertion
const config = {
  endpoint: "/api",
  retries: 3
} as const;
// Type: { readonly endpoint: "/api"; readonly retries: 3 }

// Non-null assertion (!)
function getValue(map: Map<string, string>, key: string): string {
  // We "know" the key exists
  return map.get(key)!;  // Asserts not undefined
}

// Double assertion (escape hatch)
const value = "hello" as unknown as number;  // Dangerous!

// Satisfies operator (TS 4.9+)
const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255]
} satisfies Record<string, string | number[]>;

// Type is inferred precisely:
// { red: number[]; green: string; blue: number[] }
// But validated against Record<string, string | number[]>

palette.green.toUpperCase();  // OK - green is inferred as string
// palette.red.toUpperCase();  // Error - red is number[]

// vs 'as' which loses precision:
const palette2 = {
  red: [255, 0, 0],
  green: "#00ff00"
} as Record<string, string | number[]>;

// palette2.green.toUpperCase();  // Error - could be number[]
```

---

## 8. Conditional Types {#8-conditional-types}

### Basic Conditional Types

```typescript
// Syntax: T extends U ? X : Y
// "If T is assignable to U, then X, else Y"

type IsString<T> = T extends string ? true : false;

type A = IsString<string>;   // true
type B = IsString<number>;   // false
type C = IsString<"hello">;  // true

// Practical example: Unwrap array type
type UnwrapArray<T> = T extends Array<infer U> ? U : T;

type D = UnwrapArray<string[]>;  // string
type E = UnwrapArray<number>;    // number (not an array)

// Unwrap Promise
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type F = UnwrapPromise<Promise<string>>;  // string
type G = UnwrapPromise<number>;           // number

// Nested unwrapping
type DeepUnwrap<T> = T extends Promise<infer U>
  ? DeepUnwrap<U>
  : T extends Array<infer V>
  ? DeepUnwrap<V>
  : T;

type H = DeepUnwrap<Promise<Promise<string[]>>>;  // string
```

### Infer Keyword

```typescript
// infer creates a type variable within conditional type
// Can only be used in extends clause

// Extract function return type
type ReturnOf<T> = T extends (...args: any[]) => infer R ? R : never;

type I = ReturnOf<() => string>;        // string
type J = ReturnOf<(x: number) => void>; // void

// Extract function parameter types
type ParamsOf<T> = T extends (...args: infer P) => any ? P : never;

type K = ParamsOf<(a: string, b: number) => void>;  // [a: string, b: number]

// Extract array element type
type ElementOf<T> = T extends (infer E)[] ? E : never;

type L = ElementOf<string[]>;  // string

// Extract Promise value type
type PromiseValue<T> = T extends Promise<infer V> ? V : never;

type M = PromiseValue<Promise<number>>;  // number

// Multiple infer positions
type FirstAndLast<T> = T extends [infer F, ...any[], infer L]
  ? [F, L]
  : never;

type N = FirstAndLast<[1, 2, 3, 4]>;  // [1, 4]
type O = FirstAndLast<[1]>;           // never

// infer with constraints (TS 4.7+)
type GetStringValue<T> = T extends { value: infer V extends string }
  ? V
  : never;

type P = GetStringValue<{ value: "hello" }>;  // "hello"
type Q = GetStringValue<{ value: 42 }>;       // never
```

### Distributive Conditional Types

```typescript
// Conditional types distribute over unions
// T extends U ? X : Y distributes when T is a union

type ToArray<T> = T extends any ? T[] : never;

type R = ToArray<string | number>;
// Distributes: ToArray<string> | ToArray<number>
// Result: string[] | number[]

// Without distribution, it would be (string | number)[]

// Prevent distribution with tuple
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;

type S = ToArrayNonDist<string | number>;
// Result: (string | number)[]

// Practical example: Exclude
type MyExclude<T, U> = T extends U ? never : T;

type T1 = MyExclude<"a" | "b" | "c", "a">;
// "a" extends "a" ? never : "a" -> never
// "b" extends "a" ? never : "b" -> "b"
// "c" extends "a" ? never : "c" -> "c"
// Result: "b" | "c"

// Filter union by type
type FilterByType<T, U> = T extends U ? T : never;

type Strings = FilterByType<string | number | boolean, string | boolean>;
// string | boolean

// Get function properties
type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

interface Mixed {
  name: string;
  age: number;
  greet(): void;
  calculate(x: number): number;
}

type FnKeys = FunctionKeys<Mixed>;  // "greet" | "calculate"
```

### Complex Conditional Patterns

```typescript
// Recursive conditional types
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

type Deep = number[][][][];
type Flat = Flatten<Deep>;  // number

// Conditional with mapped types
type OptionalByType<T, U> = {
  [K in keyof T]: T[K] extends U ? T[K] | undefined : T[K];
};

interface Config {
  name: string;
  count: number;
  active: boolean;
}

type OptionalNumbers = OptionalByType<Config, number>;
// { name: string; count: number | undefined; active: boolean }

// Overload extraction
type GetOverloadReturnType<T> = T extends {
  (...args: any[]): infer R1;
  (...args: any[]): infer R2;
}
  ? R1 | R2
  : never;

declare function overloaded(x: string): string;
declare function overloaded(x: number): number;

type Returns = GetOverloadReturnType<typeof overloaded>;  // string | number

// JSON serializable check
type IsJSONSerializable<T> = T extends string | number | boolean | null
  ? true
  : T extends Function
  ? false
  : T extends object
  ? { [K in keyof T]: IsJSONSerializable<T[K]> } extends { [K in keyof T]: true }
    ? true
    : false
  : false;
```

---

## 9. Mapped Types {#9-mapped-types}

### Basic Mapped Types

```typescript
// Mapped type: Transform every property
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

type Partial<T> = {
  [K in keyof T]?: T[K];
};

// Custom mapped type
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

interface User {
  name: string;
  age: number;
}

type NullableUser = Nullable<User>;
// { name: string | null; age: number | null }

// Mapping over union of strings
type OptionsFlags<T extends string> = {
  [K in T]: boolean;
};

type Features = "darkMode" | "notifications" | "analytics";
type FeatureFlags = OptionsFlags<Features>;
// { darkMode: boolean; notifications: boolean; analytics: boolean }
```

### Modifiers in Mapped Types

```typescript
// Add modifier: +readonly, +?
// Remove modifier: -readonly, -?

// Remove optional
type Required<T> = {
  [K in keyof T]-?: T[K];
};

// Remove readonly
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

// Add both
type ReadonlyPartial<T> = {
  +readonly [K in keyof T]+?: T[K];
};

// Example
interface Config {
  readonly host: string;
  port?: number;
}

type MutableRequired = Mutable<Required<Config>>;
// { host: string; port: number }
```

### Key Remapping (as clause)

```typescript
// Rename keys in mapped types (TS 4.1+)
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type Setters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
// { getName: () => string; getAge: () => number }

type PersonSetters = Setters<Person>;
// { setName: (value: string) => void; setAge: (value: number) => void }

// Filter keys using never
type FilteredKeys<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

type OnlyStrings = FilteredKeys<Person, string>;
// { name: string }

// Remove specific keys
type OmitByName<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

type WithoutAge = OmitByName<Person, "age">;
// { name: string }

// Combine with template literals
type EventConfig<T> = {
  [K in keyof T as `on${Capitalize<string & K>}Change`]: (value: T[K]) => void;
};

type PersonEvents = EventConfig<Person>;
// { onNameChange: (value: string) => void; onAgeChange: (value: number) => void }
```

### Advanced Mapped Type Patterns

```typescript
// Deep mapped types
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? T[K] extends Function
      ? T[K]
      : DeepReadonly<T[K]>
    : T[K];
};

// Path-based type
type Path<T, K extends keyof T = keyof T> = K extends string
  ? T[K] extends object
    ? K | `${K}.${Path<T[K]>}`
    : K
  : never;

interface NestedObj {
  a: {
    b: {
      c: string;
    };
  };
  d: number;
}

type Paths = Path<NestedObj>;  // "a" | "a.b" | "a.b.c" | "d"

// Mapped type for event emitter
type EventMap = {
  click: { x: number; y: number };
  focus: { target: HTMLElement };
  blur: { target: HTMLElement };
};

type EventHandlers<T> = {
  [K in keyof T as `on${Capitalize<string & K>}`]: (event: T[K]) => void;
};

type Handlers = EventHandlers<EventMap>;
// {
//   onClick: (event: { x: number; y: number }) => void;
//   onFocus: (event: { target: HTMLElement }) => void;
//   onBlur: (event: { target: HTMLElement }) => void;
// }

// Make all functions async
type Async<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? (...args: A) => Promise<R>
    : T[K];
};

interface SyncApi {
  getData(): string;
  setData(value: string): void;
  count: number;
}

type AsyncApi = Async<SyncApi>;
// {
//   getData: () => Promise<string>;
//   setData: (value: string) => Promise<void>;
//   count: number;  // Non-function unchanged
// }
```

---

## 10. Template Literal Types {#10-template-literal-types}

### Basic Template Literals

```typescript
// Template literal types (TS 4.1+)
type Greeting = `Hello, ${string}!`;

const g1: Greeting = "Hello, World!";  // OK
const g2: Greeting = "Hello, TypeScript!";  // OK
// const g3: Greeting = "Hi, World!";  // Error

// With union types
type Color = "red" | "green" | "blue";
type Size = "small" | "medium" | "large";

type ColorSize = `${Color}-${Size}`;
// "red-small" | "red-medium" | "red-large" |
// "green-small" | "green-medium" | "green-large" |
// "blue-small" | "blue-medium" | "blue-large"

// String manipulation
type Upper = Uppercase<"hello">;  // "HELLO"
type Lower = Lowercase<"HELLO">;  // "hello"
type Cap = Capitalize<"hello">;   // "Hello"
type Uncap = Uncapitalize<"Hello">;  // "hello"

// Combined with manipulation
type EventName = "click" | "scroll" | "mousedown";
type EventHandler = `on${Capitalize<EventName>}`;
// "onClick" | "onScroll" | "onMousedown"
```

### Pattern Matching with Template Literals

```typescript
// Extract parts of string type
type ExtractRouteParams<T extends string> =
  T extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? Param | ExtractRouteParams<Rest>
    : T extends `${infer _Start}:${infer Param}`
    ? Param
    : never;

type RouteParams = ExtractRouteParams<"/users/:userId/posts/:postId">;
// "userId" | "postId"

// Parse dot notation
type Split<S extends string, D extends string> =
  S extends `${infer Head}${D}${infer Tail}`
    ? [Head, ...Split<Tail, D>]
    : [S];

type Path = Split<"a.b.c.d", ".">;  // ["a", "b", "c", "d"]

// Get nested property type
type DeepValue<T, P extends string> =
  P extends `${infer Key}.${infer Rest}`
    ? Key extends keyof T
      ? DeepValue<T[Key], Rest>
      : never
    : P extends keyof T
    ? T[P]
    : never;

interface Obj {
  a: {
    b: {
      c: string;
    };
  };
}

type ValueType = DeepValue<Obj, "a.b.c">;  // string

// CSS property types
type CSSProperty = "margin" | "padding" | "border";
type CSSDirection = "top" | "right" | "bottom" | "left";
type CSSPropertyWithDirection = `${CSSProperty}-${CSSDirection}`;
// "margin-top" | "margin-right" | ... | "border-left"

// HTTP methods
type Method = "GET" | "POST" | "PUT" | "DELETE";
type Endpoint = "/users" | "/posts" | "/comments";
type ApiRoute = `${Method} ${Endpoint}`;
// "GET /users" | "POST /users" | ... | "DELETE /comments"
```

### Practical Template Literal Patterns

```typescript
// Type-safe event system
type ExtractEventName<T extends string> =
  T extends `on${infer Event}` ? Uncapitalize<Event> : never;

type EventNames = ExtractEventName<"onClick" | "onMouseMove" | "onKeyDown">;
// "click" | "mouseMove" | "keyDown"

// SQL query builder types
type TableName = "users" | "posts" | "comments";
type SelectQuery = `SELECT * FROM ${TableName}`;
type WhereClause<T extends string> = ` WHERE ${T}`;
type OrderByClause<T extends string> = ` ORDER BY ${T}`;

type Query = `${SelectQuery}${WhereClause<string>}${OrderByClause<string>}`;

// Route parameter extraction
type ParseUrlParams<T extends string> =
  T extends `${string}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ParseUrlParams<`/${Rest}`>]: string }
    : T extends `${string}:${infer Param}`
    ? { [K in Param]: string }
    : {};

type Params = ParseUrlParams<"/users/:userId/posts/:postId">;
// { userId: string; postId: string }

// Type-safe i18n keys
type Locale = "en" | "es" | "fr";
type TranslationKey = "greeting" | "farewell" | "error";
type LocalizedKey = `${Locale}.${TranslationKey}`;
// "en.greeting" | "en.farewell" | ... | "fr.error"

// BEM-style class names
type Block = "button" | "card" | "modal";
type Element = "title" | "body" | "footer";
type Modifier = "active" | "disabled" | "large";

type BEMClass =
  | Block
  | `${Block}__${Element}`
  | `${Block}--${Modifier}`
  | `${Block}__${Element}--${Modifier}`;
```

---

## 11. Declaration Merging & Module Augmentation {#11-declaration-merging}

### Interface Merging

```typescript
// Interfaces with same name merge automatically
interface User {
  name: string;
}

interface User {
  age: number;
}

interface User {
  email: string;
}

// User now has all three properties
const user: User = {
  name: "Alice",
  age: 30,
  email: "alice@example.com"
};

// Useful for extending built-in types
interface Array<T> {
  customMethod(): T[];
}

// Now all arrays have customMethod (type only, not implementation!)
```

### Namespace Merging

```typescript
// Function + namespace
function buildLabel(name: string): string {
  return buildLabel.prefix + name + buildLabel.suffix;
}

namespace buildLabel {
  export let prefix = "Hello, ";
  export let suffix = "!";
}

buildLabel("World");  // "Hello, World!"
buildLabel.prefix = "Hi, ";
buildLabel("World");  // "Hi, World!"

// Class + namespace (add static members)
class Album {
  constructor(public name: string) {}
}

namespace Album {
  export class Track {
    constructor(public name: string, public duration: number) {}
  }
  
  export function create(name: string): Album {
    return new Album(name);
  }
}

const album = Album.create("Greatest Hits");
const track = new Album.Track("Song 1", 180);

// Enum + namespace
enum Color {
  Red,
  Green,
  Blue
}

namespace Color {
  export function mixColors(a: Color, b: Color): Color {
    // Implementation
    return Color.Red;
  }
}

Color.mixColors(Color.Red, Color.Blue);
```

### Module Augmentation

```typescript
// Extend third-party module types

// Extend Express Request
declare module "express" {
  interface Request {
    user?: {
      id: string;
      name: string;
    };
  }
}

// Now you can use req.user in Express handlers

// Extend Vue component options
declare module "vue" {
  interface ComponentCustomProperties {
    $http: typeof fetch;
  }
}

// Extend existing module
// math.ts
export function add(a: number, b: number): number {
  return a + b;
}

// math-extensions.ts
import { add } from "./math";

declare module "./math" {
  export function multiply(a: number, b: number): number;
}

// Implementation (separate file)
export function multiply(a: number, b: number): number {
  return a * b;
}
```

### Global Augmentation

```typescript
// Add to global scope
declare global {
  interface Window {
    myApp: {
      version: string;
      config: Record<string, unknown>;
    };
  }
  
  // Global variable
  var DEBUG: boolean;
  
  // Global function
  function log(message: string): void;
}

// Usage
window.myApp = {
  version: "1.0.0",
  config: {}
};

// Extend global Array
declare global {
  interface Array<T> {
    first(): T | undefined;
    last(): T | undefined;
  }
}

// Implementation
Array.prototype.first = function() {
  return this[0];
};

Array.prototype.last = function() {
  return this[this.length - 1];
};

// Usage
[1, 2, 3].first();  // 1
[1, 2, 3].last();   // 3
```

---

## 12. Strict Mode & Compiler Options {#12-strict-mode}

### Strict Mode Options

```typescript
/**
 * tsconfig.json strict mode options
 * "strict": true enables ALL of these
 */

// ============ strictNullChecks ============
// Variables cannot be null/undefined unless explicitly typed

// Without strictNullChecks:
let name: string = null;  // OK (but dangerous!)

// With strictNullChecks:
let name: string = null;  // Error!
let name: string | null = null;  // OK

function getLength(str: string | null): number {
  // return str.length;  // Error! str might be null
  return str?.length ?? 0;  // OK
}


// ============ noImplicitAny ============
// Must declare types when they can't be inferred

// Without noImplicitAny:
function process(data) {  // data is implicit any
  return data.value;
}

// With noImplicitAny:
function process(data) {  // Error! Parameter has implicit 'any'
  return data.value;
}

function process(data: unknown) {  // OK
  // Must narrow type
}


// ============ strictFunctionTypes ============
// Stricter checking for function parameter types

type Handler = (event: MouseEvent) => void;

// Without strictFunctionTypes:
const handler: Handler = (event: Event) => {};  // OK (contravariance ignored)

// With strictFunctionTypes:
const handler: Handler = (event: Event) => {};  // Error!
// MouseEvent is more specific than Event


// ============ strictBindCallApply ============
// Stricter checking for bind, call, apply

function greet(name: string, age: number) {
  return `${name} is ${age}`;
}

// Without:
greet.call(undefined, "Alice");  // OK (missing arg ignored)

// With:
greet.call(undefined, "Alice");  // Error! Expected 2 args


// ============ strictPropertyInitialization ============
// Class properties must be initialized

// Without:
class User {
  name: string;  // OK (but undefined at runtime!)
}

// With:
class User {
  name: string;  // Error! Not initialized
  
  // Solutions:
  name: string = "";  // Initialize
  name!: string;      // Definite assignment assertion
  name?: string;      // Make optional
  
  constructor(name: string) {
    this.name = name;  // Initialize in constructor
  }
}


// ============ noImplicitThis ============
// 'this' must have explicit type

// Without:
function onClick() {
  console.log(this.value);  // 'this' is any
}

// With:
function onClick(this: HTMLInputElement) {
  console.log(this.value);  // OK
}


// ============ alwaysStrict ============
// Emit "use strict" in all files


// ============ useUnknownInCatchVariables ============
// catch clause variables are unknown instead of any

// Without:
try {
} catch (e) {
  e.message;  // OK (e is any)
}

// With:
try {
} catch (e) {
  // e is unknown
  if (e instanceof Error) {
    e.message;  // OK
  }
}
```

### Other Important Compiler Options

```typescript
/**
 * Additional tsconfig.json options for production
 */

{
  "compilerOptions": {
    // Type Checking
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,  // array[0] is T | undefined
    "exactOptionalPropertyTypes": true,  // undefined != missing
    
    // Modules
    "module": "ESNext",
    "moduleResolution": "bundler",  // or "node16" for Node.js
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    
    // Emit
    "target": "ES2022",
    "declaration": true,  // Generate .d.ts files
    "declarationMap": true,  // Source maps for .d.ts
    "sourceMap": true,
    "outDir": "./dist",
    
    // Environment
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "types": ["node"],  // Include @types/node
    
    // Advanced
    "skipLibCheck": true,  // Skip .d.ts checking (faster)
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

## 13. Common Patterns & Anti-Patterns {#13-patterns}

### Anti-Patterns to Avoid

```typescript
// ❌ ANTI-PATTERN: Using 'any' everywhere
function processData(data: any): any {
  return data.value;
}

// ✅ BETTER: Use proper types or unknown
function processData<T extends { value: unknown }>(data: T): T["value"] {
  return data.value;
}


// ❌ ANTI-PATTERN: Type assertion to silence errors
const element = document.getElementById("app") as HTMLDivElement;
element.innerText = "Hello";  // Might crash if element is null!

// ✅ BETTER: Handle null case
const element = document.getElementById("app");
if (element instanceof HTMLDivElement) {
  element.innerText = "Hello";
}


// ❌ ANTI-PATTERN: Non-null assertion abuse
function getUser(id: string): User | undefined {
  return users.get(id);
}

const user = getUser("123")!;  // Dangerous!
user.name;  // Might crash

// ✅ BETTER: Check for undefined
const user = getUser("123");
if (user) {
  user.name;  // Safe
}


// ❌ ANTI-PATTERN: Object type for "any object"
function process(obj: object) {
  console.log(obj.name);  // Error! 'object' has no properties
}

// ✅ BETTER: Use generic or specific type
function process<T extends { name: string }>(obj: T) {
  console.log(obj.name);
}


// ❌ ANTI-PATTERN: {} type (means any non-nullish value)
function log(value: {}) {
  console.log(value);  // Accepts string, number, etc.
}

// ✅ BETTER: Be specific
function log(value: Record<string, unknown>) {
  console.log(value);
}


// ❌ ANTI-PATTERN: String enum values
enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE"
}

function process(status: string) {  // Loses type safety
  // ...
}

// ✅ BETTER: Use the enum type
function process(status: Status) {
  // ...
}


// ❌ ANTI-PATTERN: Callback hell with any
function fetchData(callback: Function) {
  // ...
}

// ✅ BETTER: Type the callback properly
function fetchData(callback: (error: Error | null, data: Data) => void) {
  // ...
}


// ❌ ANTI-PATTERN: instanceof for interfaces
interface User {
  name: string;
}

function isUser(value: unknown): value is User {
  return value instanceof User;  // Error! Interface has no runtime presence
}

// ✅ BETTER: Property checking
function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    typeof (value as User).name === "string"
  );
}
```

### Best Practices

```typescript
// ✅ Use const assertions for immutable data
const config = {
  endpoint: "/api",
  retries: 3
} as const;


// ✅ Use discriminated unions for state management
type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: Data }
  | { status: "error"; error: Error };


// ✅ Use branded types for type-safe IDs
type UserId = string & { __brand: "UserId" };
type PostId = string & { __brand: "PostId" };

function createUserId(id: string): UserId {
  return id as UserId;
}

function getUser(id: UserId): User {
  // ...
}

const userId = createUserId("123");
const postId = "456" as PostId;

getUser(userId);   // OK
// getUser(postId);  // Error! PostId not assignable to UserId


// ✅ Use function overloads for different return types
function createElement(tag: "div"): HTMLDivElement;
function createElement(tag: "span"): HTMLSpanElement;
function createElement(tag: "input"): HTMLInputElement;
function createElement(tag: string): HTMLElement {
  return document.createElement(tag);
}

const div = createElement("div");  // HTMLDivElement


// ✅ Use satisfies for type checking without widening
const palette = {
  red: "#ff0000",
  green: "#00ff00",
  blue: "#0000ff"
} satisfies Record<string, string>;

// palette.red is inferred as "#ff0000", not string


// ✅ Use generics for reusable components
interface ApiResponse<T> {
  data: T;
  status: number;
  timestamp: Date;
}

async function fetchApi<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  return {
    data: await response.json(),
    status: response.status,
    timestamp: new Date()
  };
}


// ✅ Use type guards for runtime safety
function assertIsError(value: unknown): asserts value is Error {
  if (!(value instanceof Error)) {
    throw new Error("Value is not an Error");
  }
}


// ✅ Use never for exhaustive checking
type Action = { type: "A" } | { type: "B" };

function handleAction(action: Action) {
  switch (action.type) {
    case "A":
      return "Handling A";
    case "B":
      return "Handling B";
    default:
      const _exhaustive: never = action;
      return _exhaustive;
  }
}
```

---

## 14. Real-World Scenarios {#14-real-world}

### API Response Handling

```typescript
// Type-safe API client
interface ApiConfig {
  baseUrl: string;
  headers?: Record<string, string>;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestConfig<T = unknown> {
  method: HttpMethod;
  endpoint: string;
  body?: T;
  params?: Record<string, string>;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Headers;
}

interface ApiError {
  message: string;
  code: string;
  status: number;
}

type Result<T, E = ApiError> =
  | { success: true; data: T }
  | { success: false; error: E };

class ApiClient {
  constructor(private config: ApiConfig) {}

  async request<TResponse, TBody = unknown>(
    config: RequestConfig<TBody>
  ): Promise<Result<TResponse>> {
    try {
      const url = new URL(config.endpoint, this.config.baseUrl);
      
      if (config.params) {
        Object.entries(config.params).forEach(([key, value]) => {
          url.searchParams.set(key, value);
        });
      }

      const response = await fetch(url.toString(), {
        method: config.method,
        headers: {
          "Content-Type": "application/json",
          ...this.config.headers
        },
        body: config.body ? JSON.stringify(config.body) : undefined
      });

      if (!response.ok) {
        return {
          success: false,
          error: {
            message: response.statusText,
            code: "HTTP_ERROR",
            status: response.status
          }
        };
      }

      const data = await response.json() as TResponse;
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: {
          message: error instanceof Error ? error.message : "Unknown error",
          code: "NETWORK_ERROR",
          status: 0
        }
      };
    }
  }

  get<T>(endpoint: string, params?: Record<string, string>) {
    return this.request<T>({ method: "GET", endpoint, params });
  }

  post<TResponse, TBody>(endpoint: string, body: TBody) {
    return this.request<TResponse, TBody>({ method: "POST", endpoint, body });
  }
}

// Usage
interface User {
  id: string;
  name: string;
  email: string;
}

const api = new ApiClient({ baseUrl: "https://api.example.com" });

async function getUser(id: string) {
  const result = await api.get<User>(`/users/${id}`);
  
  if (result.success) {
    console.log(result.data.name);  // Type-safe!
  } else {
    console.error(result.error.message);
  }
}
```

### React Component Patterns

```typescript
import { ReactNode, ComponentProps, forwardRef } from "react";

// Polymorphic component (as prop)
type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = Props &
  AsProp<C> &
  Omit<ComponentProps<C>, PropsToOmit<C, Props>>;

type ButtonProps<C extends React.ElementType> = PolymorphicComponentProp<
  C,
  { variant?: "primary" | "secondary"; size?: "sm" | "md" | "lg" }
>;

function Button<C extends React.ElementType = "button">({
  as,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps<C>) {
  const Component = as || "button";
  return <Component {...props}>{children}</Component>;
}

// Usage
<Button>Click me</Button>  // Renders as button
<Button as="a" href="/home">Link</Button>  // Renders as anchor


// Generic list component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T, index: number) => string;
  emptyMessage?: string;
}

function List<T>({ items, renderItem, keyExtractor, emptyMessage }: ListProps<T>) {
  if (items.length === 0) {
    return <div>{emptyMessage ?? "No items"}</div>;
  }

  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor(item, index)}>{renderItem(item, index)}</li>
      ))}
    </ul>
  );
}

// Usage
interface User {
  id: string;
  name: string;
}

<List<User>
  items={users}
  renderItem={(user) => <span>{user.name}</span>}
  keyExtractor={(user) => user.id}
/>


// Compound component pattern
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabs() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("useTabs must be used within Tabs");
  }
  return context;
}

interface TabsProps {
  children: ReactNode;
  defaultTab: string;
}

function Tabs({ children, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

interface TabProps {
  id: string;
  children: ReactNode;
}

Tabs.Tab = function Tab({ id, children }: TabProps) {
  const { activeTab, setActiveTab } = useTabs();

  return (
    <button
      className={activeTab === id ? "active" : ""}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
};

Tabs.Panel = function Panel({ id, children }: TabProps) {
  const { activeTab } = useTabs();

  if (activeTab !== id) return null;
  return <div>{children}</div>;
};

// Usage
<Tabs defaultTab="tab1">
  <Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
  <Tabs.Tab id="tab2">Tab 2</Tabs.Tab>
  <Tabs.Panel id="tab1">Content 1</Tabs.Panel>
  <Tabs.Panel id="tab2">Content 2</Tabs.Panel>
</Tabs>
```

### State Management Types

```typescript
// Redux-style typed actions
interface Action<T extends string = string, P = undefined> {
  type: T;
  payload: P;
}

// Action creators
function createAction<T extends string>(type: T): Action<T>;
function createAction<T extends string, P>(type: T, payload: P): Action<T, P>;
function createAction<T extends string, P>(type: T, payload?: P): Action<T, P> {
  return { type, payload: payload as P };
}

// Usage
const increment = createAction("INCREMENT");
const addTodo = createAction("ADD_TODO", { text: "Learn TypeScript" });

// Type-safe reducer
type TodoAction =
  | Action<"ADD_TODO", { text: string }>
  | Action<"REMOVE_TODO", { id: number }>
  | Action<"TOGGLE_TODO", { id: number }>;

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  nextId: number;
}

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: state.nextId, text: action.payload.text, completed: false }
        ],
        nextId: state.nextId + 1
      };
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload.id)
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload.id ? { ...t, completed: !t.completed } : t
        )
      };
    default:
      const _exhaustive: never = action;
      return state;
  }
}

// Zustand-style store
interface Store<T> {
  getState: () => T;
  setState: (partial: Partial<T> | ((state: T) => Partial<T>)) => void;
  subscribe: (listener: (state: T) => void) => () => void;
}

function createStore<T>(initialState: T): Store<T> {
  let state = initialState;
  const listeners = new Set<(state: T) => void>();

  return {
    getState: () => state,
    setState: (partial) => {
      const nextState =
        typeof partial === "function" ? partial(state) : partial;
      state = { ...state, ...nextState };
      listeners.forEach((listener) => listener(state));
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
}
```

---

## 15. Interview Questions & Answers {#15-interview-questions}

### Beginner Questions

```typescript
/**
 * Q: What's the difference between 'interface' and 'type'?
 * 
 * A: Both can describe object shapes, but:
 * - Interface: Declaration merging, can be extended, better for OOP
 * - Type: Unions, mapped types, computed properties, more flexible
 * 
 * Use interface for object APIs, type for everything else.
 */


/**
 * Q: What is 'never' type used for?
 * 
 * A: 'never' represents values that never occur:
 * 1. Functions that never return (throw or infinite loop)
 * 2. Exhaustive checking in switch statements
 * 3. Impossible intersections (string & number)
 */


/**
 * Q: What's the difference between '==' and '===' in TypeScript?
 * 
 * A: Same as JavaScript! TypeScript doesn't change this.
 * - '==': Loose equality (type coercion)
 * - '===': Strict equality (no coercion)
 * Always use '==='. TypeScript helps but doesn't prevent '==' issues.
 */


/**
 * Q: How do you make a property optional?
 * 
 * A: Use the '?' modifier:
 */
interface User {
  name: string;
  age?: number;  // Optional
}


/**
 * Q: What's a tuple in TypeScript?
 * 
 * A: Fixed-length array with specific types at each position:
 */
type Point = [number, number];
type NameAge = [string, number];
const point: Point = [10, 20];
```

### Intermediate Questions

```typescript
/**
 * Q: Explain 'any' vs 'unknown'
 * 
 * A: 
 * - 'any': Disables type checking. Avoid!
 * - 'unknown': Type-safe any. Must narrow before using.
 * 
 * Use 'unknown' for values of truly unknown type, then narrow:
 */
function processUnknown(value: unknown) {
  if (typeof value === "string") {
    return value.toUpperCase();  // Now TypeScript knows it's string
  }
  return String(value);
}


/**
 * Q: What are type guards?
 * 
 * A: Functions that narrow types at runtime:
 */
// typeof guard
function process(value: string | number) {
  if (typeof value === "string") {
    // value is string
  }
}

// Custom type guard with 'is'
function isUser(obj: unknown): obj is User {
  return typeof obj === "object" && obj !== null && "name" in obj;
}


/**
 * Q: Explain generics with an example
 * 
 * A: Generics create reusable components that work with any type:
 */
function identity<T>(value: T): T {
  return value;
}

const str = identity("hello");  // Type: string
const num = identity(42);       // Type: number


/**
 * Q: What's the difference between 'extends' and 'implements'?
 * 
 * A:
 * - extends: Inherit implementation from class/interface
 * - implements: Fulfill contract without inheriting implementation
 */
interface Printable {
  print(): void;
}

class Base {
  log() { console.log("Base"); }
}

class Derived extends Base implements Printable {
  print() { console.log("Print"); }
}


/**
 * Q: What is a discriminated union?
 * 
 * A: Union types with a common literal property for narrowing:
 */
type Result =
  | { status: "success"; data: string }
  | { status: "error"; error: Error };

function handle(result: Result) {
  if (result.status === "success") {
    console.log(result.data);  // TypeScript knows data exists
  } else {
    console.error(result.error);  // TypeScript knows error exists
  }
}
```

### Senior Questions

```typescript
/**
 * Q: Explain covariance and contravariance
 * 
 * A: Variance describes how type relationships transform:
 * 
 * - Covariance: A<Child> assignable to A<Parent>
 *   (Same direction - arrays, return types)
 * 
 * - Contravariance: A<Parent> assignable to A<Child>
 *   (Opposite direction - function parameters)
 */
type Getter<T> = () => T;  // Covariant in T
type Setter<T> = (value: T) => void;  // Contravariant in T

// Covariance example
declare let getAnimal: Getter<Animal>;
declare let getDog: Getter<Dog>;
getAnimal = getDog;  // OK - Dog is Animal, so Getter<Dog> → Getter<Animal>

// Contravariance example (with strictFunctionTypes)
declare let setAnimal: Setter<Animal>;
declare let setDog: Setter<Dog>;
setDog = setAnimal;  // OK - Can pass Dog to Animal setter
// setAnimal = setDog;  // Error! Can't pass Cat to Dog setter


/**
 * Q: Implement a DeepPartial type
 * 
 * A: Recursively make all properties optional:
 */
type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;


/**
 * Q: Implement a type that extracts function parameter types
 * 
 * A: Use conditional types with infer:
 */
type Parameters<T extends (...args: any) => any> =
  T extends (...args: infer P) => any ? P : never;

type Params = Parameters<(a: string, b: number) => void>;
// [a: string, b: number]


/**
 * Q: What's the difference between {} and object?
 * 
 * A:
 * - {}: Any non-nullish value (string, number, object, etc.)
 * - object: Any non-primitive (object, array, function)
 * - Object: Wrapper type (avoid)
 * 
 * Use Record<string, unknown> for "any object"
 */


/**
 * Q: Explain module augmentation
 * 
 * A: Extend existing modules/libraries with additional types:
 */
// Extend Express Request
declare module "express" {
  interface Request {
    user?: User;
  }
}


/**
 * Q: What is a branded type and when would you use it?
 * 
 * A: Nominal typing via intersection with unique symbol:
 */
type UserId = string & { readonly __brand: unique symbol };
type PostId = string & { readonly __brand: unique symbol };

// Prevents mixing up IDs even though both are strings
function getUser(id: UserId): User { ... }
function getPost(id: PostId): Post { ... }

const userId = "123" as UserId;
const postId = "456" as PostId;

getUser(userId);  // OK
// getUser(postId);  // Error!


/**
 * Q: How would you type a function that takes an object and returns
 *    a new object with the same keys but different value types?
 * 
 * A: Use mapped types:
 */
type MapValues<T, V> = { [K in keyof T]: V };

function mapValues<T extends object, V>(
  obj: T,
  fn: (value: T[keyof T]) => V
): MapValues<T, V> {
  const result = {} as MapValues<T, V>;
  for (const key in obj) {
    result[key] = fn(obj[key]);
  }
  return result;
}

const lengths = mapValues({ a: "hello", b: "world" }, (s) => s.length);
// Type: { a: number; b: number }


/**
 * Q: Explain the 'infer' keyword
 * 
 * A: 'infer' creates a type variable within conditional types:
 */
// Extract array element type
type ElementType<T> = T extends (infer E)[] ? E : never;

// Extract promise value
type UnwrapPromise<T> = T extends Promise<infer V> ? V : T;

// Extract function return type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

---

## Quick Reference Cheat Sheet

```
TYPE COMPARISON:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
any        - Disables checking (avoid!)
unknown    - Type-safe any (must narrow)
never      - Impossible values (exhaustive check)
void       - No return value
null       - Intentional absence
undefined  - Uninitialized

UTILITY TYPES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Partial<T>      - All optional
Required<T>     - All required
Readonly<T>     - All readonly
Pick<T, K>      - Select keys
Omit<T, K>      - Remove keys
Record<K, V>    - Object with K keys and V values
Exclude<T, U>   - Remove from union
Extract<T, U>   - Keep in union
NonNullable<T>  - Remove null/undefined
ReturnType<T>   - Function return type
Parameters<T>   - Function params as tuple

TYPE GUARDS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
typeof x === "string"  - Primitive check
x instanceof Class     - Instance check
"prop" in x           - Property check
isType(x): x is Type  - Custom guard

BEST PRACTICES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Enable strict mode
✓ Use unknown instead of any
✓ Prefer interface for objects
✓ Use discriminated unions
✓ Add exhaustive checking
✓ Use const assertions
✓ Use satisfies for validation
✗ Avoid type assertions
✗ Avoid non-null assertions
✗ Avoid {} type
```

---
