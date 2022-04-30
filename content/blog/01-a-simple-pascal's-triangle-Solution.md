---
title: A Simple Pascal's Triangle Solution
description: null
author: Samarth Chitgopekar
date: 1/1/22
important: false
source: https://dev.to/httpsamc/a-simple-pascals-triangle-solution-1jn2
cover: https://www.pewresearch.org/internet/wp-content/uploads/sites/9/2017/02/PI_2017.02.08_Algorithms_featured.png
tags:
    - Coding Interview
    - Algorithms
---

There's a well-known Google algorithm interview question out there that I think is a great beginner problem. For full discolsure, [this](https://www.youtube.com/watch?v=Ap8Azsc2YT0) video inspired me to create this writeup.

## The Prompt
Return the first `numRows` rows of **Pascal's Triangle**, a triangle where each number is the sum of the two numbers directly above it, as shown:

![Pascal's Triangle Image](https://ds055uzetaobb.cloudfront.net/brioche/uploads/yLsqh65kki-pascals-triangle-5.png?width=1200)

*credit: Brialliant.com ([Hayes, Farhat, Vee](https://brilliant.org/wiki/pascals-triangle/))*

## My Thought Process
I like thinking of algorithm problems in math terminology, so that's what I'll do here. We'll start off hypothetical:

1. Given Pascal's Triangle: `P = [[Z+]]`

- Assume we somehow have the infinitely large Pascal's Triangle, it could be stored in a two dimensonal array of positive integers. Here, each nested array represents a row, starting at the very top and going to the bottom.

2. Let `N` (∀ `N ≥ 0`) be an index within `P`, s.t `P[N]` represents the `N+1`th row of Pascal's Triangle.

- We make this distinction because in programming, we use indicies (which start at 0). So, the 1st row is really represented by index 0, and so on.

3. Let `I` (∀ `I ≥ 0`) be an index within `P[N]`, s.t. `P[N][I]` represents the element in the `I+1`th column of the `N+1`th row of Pascal's Triangle.

- We make this distinction because in programming, we use indicies (which start at 0). So, the 1st column is really represented by index 0, and so on.

4. Therefore, the element `E` at `P[N][I] = P[N-1][I-1] + P[N-1][I]`.

- This is the key realization. What this is really saying is that the element at any position is the sum of the element in the previous row to the left and the element in the previous row to the right. The `N-1` index makes sense, since it gets us the row before the current one. But why the positions `I-1` and `I`? Look at a subsection of the Pascal's Triangle below, but with the numbers represented by their **column indicies**:

```
Row A:   0   1   2   3
Row B: 0   1   2   3   4
```

- This is the pattern-recognition that is key to this problem. I like to imagine chopping off the last element of `Row B` so that they're symmetrical, kind of like this:
 
```
Row C: 0   1   2   3
Row D: 0   1   2   3
```

- As you can see, we have three elements touching from the top row: the one directly above (`I`), the one above to the left (`I-1`), and the one above to the right (`I+1`). When we offset the triangle by that extra element, we 'push' the right one out of contact (since each row adds one element). So, our 2 touching elements above can be found at `I-1` and `I`, what we used to create our definition.

5. Edge Cases: `E = 1` ∀ `I ≠ 0` ∪ `I ≠ N`.

- When there aren't 2 elements directly above an `E`, Pascal's Triangle dictates that we default to `E = 1` (we can see this on the very first row and the diagonals). We can handle the tip of the triangle and the left diagonal cases by having `E = 1` ∀ `I ≠ 0`, since they're all at the very beginning of their rows (index 0). We can handle the right diagonal with `E = 1` ∀ `I ≠ N`. We know that the `N`th row has `N+1` elements. So, the last element would be at the index `N` (subtract 1 from literal position to get index). Therefore, `I ≠ N` gets us all the elements except for the ones on the right diagonal (end of a row).

## My Solution

There are obviously many ways to solve this problem, all with their own various time and space complexities. This is the one that makes the most sense to me and corresponds to the breakdown I gave, written in Python 3.

```Python
def getPascalsTriangle(n: int) -> 'list[list[int]]':

    # Handle edge cases
    if n <= 0:
        return []
    elif n == 1:
        return [[1]]
    elif n == 2:
        return [[1], [1, 1]]

    # At this point, we have a triangle with >= 3 rows
    triangle: 'list[list[int]]' = [[1], [1, 1]]

    # Start building the required rows on top of the first 2
    for i in range(2, n):

        # Create a new row
        row: list[int] = []

        # The first element is always 1
        row.append(1)

        # Every element here has two elements above it, so we can
        # use the sum of those to calculate its value
        for j in range(1, i):
            row.append(triangle[i-1][j-1] + triangle[i-1][j])

        # The last element is always 1
        row.append(1)

        # Add the new row to the triangle
        triangle.append(row)

    # Return the triangle
    return triangle

if __name__ == '__main__':
    # Pretty printed tester for Pascal's Triangle method
    numRows: int = 10
    triangle: 'list[list[int]]' = getPascalsTriangle(numRows)

    for row in triangle:
        for col in row:
            print(col, end=' ')
        print()
```