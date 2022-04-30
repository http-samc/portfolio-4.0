---
title: 'In-Memory Databases: A Demo'
description: null
author: Samarth Chitgopekar
date: 8/8/21
important: false
source: https://dev.to/httpsamc/in-memory-databases-a-pratical-demo-4bmp
cover: https://upload.wikimedia.org/wikipedia/en/6/6b/Redis_Logo.svg
tags:
    - Redis
    - Databases
    - Python
---

Many of you might've heard a thing or two about [Redis](https://redis.io/), an in-memory database that enables super fast reads and writes. But why is this?

We first need to understand what "in-memory" really means. A computer has RAM (Random Access Memory) that's super fast. This is where Redis lives, in the same place any variable or object you create in any language.

RAM is very fast, but it comes at a monetary cost - disk space (think your hard drive or ssd) is slower but cheaper. This is easily Redis' biggest pitfall, as RAM becomes a limiting factor regarding how much data you can store.

With that brief introduction out of the way, let's dive into a crude demonstration of just how much faster Redis can be in comparison to storage in a generic database. We'll just be using a simple Json file for this example, but the concept applies to virtually any database.

I'll be writing this in Python 3.10, but any modern version of Python 3 will work. No external dependencies are required.

<details>
<summary>Here's the step by step walkthrough</summary>

To start, I'm going to import a few modules: `json` (allows us to port between json <-> python dict) and `time` (allows us to keep track of time). Then, I'll create a dictionary called `DATA`, which will be cached in memory since it's a variable.

```Python
import json
import time

DATA: dict = {
    "key": "val"
}
```

Next, I'll define a quick method to create a Json file that represents the `DATA` variable in the current directory - this is what we'll compare our in-memory calls to:

```Python
def createJsonFile() -> None:
    "Creates a simple data.json in the current directory with the value of the dict DATA"

    with open('data.json', 'w') as f:
        json.dump(DATA, f)
```

Now I'll define a method that opens the Json file, converts it into a dict, and calls for the value of `key`:

```Python
def readFromJson() -> float:
    """Reads the value of "key" by opening data.json and parsing it into a dict,
    and then querying the in-memory dict.

    Returns:
        float: How long the operation took to complete in seconds (rounded to 6 dec.)
    """

    start = time.time()

    with open('data.json', 'r') as f:
        readData = json.loads(f.read())
    value = readData["key"]

    timeToComplete = round(time.time()-start, 6)

    print(f"Finished querying Json in: {timeToComplete} sec. (value: {value})")
    return timeToComplete
```

Here, I'm defining a method to get the value of `key`, but from the already cached in-memory dict `DATA`:

```Python
def readFromMemory() -> float:
    """Reads the value of "key" from the in-memory dict DATA (global)"

    Returns:
        float: How long the operation took to complete in seconds (rounded to 6 dec.)
    """
    start = time.time()

    value = DATA["key"]

    timeToComplete = round(time.time()-start, 6)

    print(f"Finished querying memory in: {timeToComplete} sec. (value: {value})")
    return timeToComplete
```

Finally, I'll define a quick tester method to compare the in-memory calls vs the file calls:

```Python
 def main() -> float:
    """Runs a call to readFromMemory and readFromJson and explains which was faster
    and by how much.

    Returns:
        float: the time difference between the readFromMemory and readFromJson calls (rounded to 6 dec.)
                (if pos. -> readFromMemory was faster, if neg. -> readFromJson was faster)
    """
    readFromJsonTime = readFromJson()
    readFromMemoryTime = readFromMemory()

    totalDelta = round(readFromJsonTime-readFromMemoryTime, 6)

    if totalDelta >= 0:
        print(f"Reading from memory was {totalDelta} sec. faster than reading from Json!")
    else:
        print(f"Wow! Reading from Json was actually {-totalDelta} sec. faster!")

    return totalDelta
```

As a bonus, I'm going to define a batch method to run lots of tests for us an aggregate the total results:

```Python
def runTests(numTests: int = 10000) -> None:
    """Runs lots of comparisons and explains the net delta,
    or how much time was saved by the in-memory calls.

    Args:
        numTests (int, optional): How many tests to run. Defaults to 10,000.
    """
    start = time.time()
    deltaCount = 0

    for _ in range(1, numTests):
        deltaCount += main()

    timeToComplete = round(time.time()-start, 6)
    print(f"Finished with a net delta of {round(deltaCount, 6)} seconds saved! (Runtime: {timeToComplete} sec.)")
```

Last but not least, the actual call:

```Python
if __name__ == "__main__":
    createJsonFile()

    # Try this out first to see a single test
    main()

    # Run this later to see a large comparsion - supply a custom value for numTests if you want!
    #runTests()
```

</details>

<br>

<details>
<summary>Here's the complete Python code (copy-pasteable)</summary>

```Python
import json
import time

DATA: dict = {
    "key": "val"
}

def createJsonFile() -> None:
    "Creates a simple data.json in the current directory with the value of the dict DATA"

    with open('data.json', 'w') as f:
        json.dump(DATA, f)

def readFromJson() -> float:
    """Reads the value of "key" by opening data.json and parsing it into a dict,
    and then querying the in-memory dict.

    Returns:
        float: How long the operation took to complete in seconds (rounded to 6 dec.)
    """

    start = time.time()

    with open('data.json', 'r') as f:
        readData = json.loads(f.read())
    value = readData["key"]

    timeToComplete = round(time.time()-start, 6)

    print(f"Finished querying Json in: {timeToComplete} sec. (value: {value})")
    return timeToComplete

def readFromMemory() -> float:
    """Reads the value of "key" from the in-memory dict DATA (global)"

    Returns:
        float: How long the operation took to complete in seconds (rounded to 6 dec.)
    """
    start = time.time()

    value = DATA["key"]

    timeToComplete = round(time.time()-start, 6)

    print(f"Finished querying memory in: {timeToComplete} sec. (value: {value})")
    return timeToComplete

def main() -> float:
    """Runs a call to readFromMemory and readFromJson and explains which was faster
    and by how much.

    Returns:
        float: the time difference between the readFromMemory and readFromJson calls (rounded to 6 dec.)
                (if pos. -> readFromMemory was faster, if neg. -> readFromJson was faster)
    """
    readFromJsonTime = readFromJson()
    readFromMemoryTime = readFromMemory()

    totalDelta = round(readFromJsonTime-readFromMemoryTime, 6)

    if totalDelta >= 0:
        print(f"Reading from memory was {totalDelta} sec. faster than reading from Json!")
    else:
        print(f"Wow! Reading from Json was actually {-totalDelta} sec. faster!")

    return totalDelta

def runTests(numTests: int = 10000) -> None:
    """Runs lots of comparisons and explains the net delta,
    or how much time was saved by the in-memory calls.

    Args:
        numTests (int, optional): How many tests to run. Defaults to 10,000.
    """
    start = time.time()
    deltaCount = 0

    for _ in range(1, numTests):
        deltaCount += main()

    timeToComplete = round(time.time()-start, 6)
    print(f"Finished with a net delta of {round(deltaCount, 6)} seconds saved! (Runtime: {timeToComplete} sec.)")

if __name__ == "__main__":
    createJsonFile()

    # Try this out first to see a single test
    main()

    # Run this later to see a large comparsion - supply a custom value for numTests if you want!
    #runTests()
```
</details>

## The Demo
To start, just run the program. You'll see a single test that might print out something like this:

```
Finished querying Json in: 0.001 sec. (value: val)
Finished querying memory in: 0.0 sec. (value: val)
Reading from memory was 0.001 sec. faster than reading from Json!
```

As you can see, there's a difference. That might not seem like a lot, but try commenting out `main()` and uncommenting `runTests()`. Here's what it looked like when I passed in `numTests=100000` to the `runTests` call:

```
<-- Hundreds of thousands of lines of individual test results -->
Finished with a net delta of 17.438135 seconds saved! (Runtime: 73.684126 sec.)
```

As you can see, those small differences add up. Now for most applications, I doubt you'll need something as powerful as Redis. But, there's a reason big tech companies that rely on speedy APIs like [Twitter](https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/improving-key-expiration-in-redis) use it.