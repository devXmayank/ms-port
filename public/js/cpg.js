let state = {
    meta: {
        name: "-",
        roll: "-",
        className: "Class XII - Science (B)",
        school: "New St. Stephen Public School, Agra",
        teacher: "Mr. Ashan Ali",
        session: "2026 - 2027"
    },
    intro: {
        coverStyle: "classic",
        certStyle: "classic",
        ackStyle: "classic",
        showCover: true,
        showCert: true,
        showAck: true,
        showIndex: true
    },
    layout: {
        layoutMode: "tabwise",
        fontSize: 10,
        codeSize: 9,
        imgHeight: 160,
        showHeaders: true
    },
    records: []
};

let currentPresetCat = 'all';

const presetLibrary = [
{ id: 1, cat: "python", title: "Sum of List Using Function", q: "Write a Python program using a function to find the sum of all elements in a list.", code: "def list_sum(lst):\n    return sum(lst)\n\nnums = [10, 20, 30, 40]\nprint('Sum:', list_sum(nums))", output: "Sum: 100" },
{ id: 2, cat: "python", title: "Factorial Using Recursion", q: "Write a recursive Python function to compute the factorial of a number.", code: "def fact(n):\n    if n == 0 or n == 1:\n        return 1\n    return n * fact(n - 1)\n\nprint('Factorial of 5:', fact(5))", output: "Factorial of 5: 120" },
{ id: 3, cat: "python", title: "Fibonacci Series Using Recursion", q: "Write a recursive Python function to print the first n terms of the Fibonacci series.", code: "def fib(n):\n    if n <= 1:\n        return n\n    return fib(n - 1) + fib(n - 2)\n\nfor i in range(8):\n    print(fib(i), end=' ')", output: "0 1 1 2 3 5 8 13" },
{ id: 4, cat: "python", title: "Check Palindrome String", q: "Write a Python program to check whether a given string is a palindrome.", code: "s = 'madam'\nif s == s[::-1]:\n    print('Palindrome')\nelse:\n    print('Not Palindrome')", output: "Palindrome" },
{ id: 5, cat: "python", title: "Count Vowels in a String", q: "Write a Python program to count the number of vowels in a string.", code: "s = 'Artificial Intelligence'\nvowels = 'aeiouAEIOU'\ncount = sum(1 for ch in s if ch in vowels)\nprint('Vowels:', count)", output: "Vowels: 9" },
{ id: 6, cat: "python", title: "Reverse a String", q: "Write a Python program to reverse a string without using slicing.", code: "s = 'Computer'\nrev = ''\nfor ch in s:\n    rev = ch + rev\nprint(rev)", output: "retupmoC" },
{ id: 7, cat: "python", title: "Check Prime Number", q: "Write a Python function to check whether a number is prime.", code: "def is_prime(n):\n    if n < 2:\n        return False\n    for i in range(2, int(n ** 0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\n\nprint(is_prime(29))", output: "True" },
{ id: 8, cat: "python", title: "GCD Using Recursion", q: "Write a recursive Python function to find the GCD of two numbers.", code: "def gcd(a, b):\n    if b == 0:\n        return a\n    return gcd(b, a % b)\n\nprint('GCD:', gcd(48, 18))", output: "GCD: 6" },
{ id: 9, cat: "python", title: "LCM of Two Numbers", q: "Write a Python program to find the LCM of two numbers.", code: "a, b = 12, 18\ngcd = 1\nfor i in range(1, min(a, b) + 1):\n    if a % i == 0 and b % i == 0:\n        gcd = i\nprint('LCM:', (a * b) // gcd)", output: "LCM: 36" },
{ id: 10, cat: "python", title: "Armstrong Number Check", q: "Write a Python program to check whether a number is an Armstrong number.", code: "n = 153\ntemp = n\ntotal = 0\nwhile temp > 0:\n    d = temp % 10\n    total += d ** 3\n    temp //= 10\nprint('Armstrong' if total == n else 'Not Armstrong')", output: "Armstrong" },
{ id: 11, cat: "python", title: "Sum of Digits", q: "Write a Python program to find the sum of digits of a number.", code: "n = 4729\ntotal = 0\nwhile n > 0:\n    total += n % 10\n    n //= 10\nprint('Sum of digits:', total)", output: "Sum of digits: 22" },
{ id: 12, cat: "python", title: "Binary to Decimal Conversion", q: "Write a Python program to convert a binary number to decimal.", code: "binary = '1011'\nprint('Decimal:', int(binary, 2))", output: "Decimal: 11" },
{ id: 13, cat: "python", title: "Decimal to Binary Conversion", q: "Write a Python program to convert a decimal number to binary.", code: "n = 45\nprint('Binary:', bin(n)[2:])", output: "Binary: 101101" },
{ id: 14, cat: "python", title: "Bubble Sort", q: "Write a Python program to sort a list using bubble sort.", code: "arr = [64, 25, 12, 22, 11]\nn = len(arr)\nfor i in range(n):\n    for j in range(0, n - i - 1):\n        if arr[j] > arr[j + 1]:\n            arr[j], arr[j + 1] = arr[j + 1], arr[j]\nprint(arr)", output: "[11, 12, 22, 25, 64]" },
{ id: 15, cat: "python", title: "Selection Sort", q: "Write a Python program to sort a list using selection sort.", code: "arr = [29, 10, 14, 37, 13]\nfor i in range(len(arr)):\n    m = i\n    for j in range(i + 1, len(arr)):\n        if arr[j] < arr[m]:\n            m = j\n    arr[i], arr[m] = arr[m], arr[i]\nprint(arr)", output: "[10, 13, 14, 29, 37]" },
{ id: 16, cat: "python", title: "Insertion Sort", q: "Write a Python program to sort a list using insertion sort.", code: "arr = [12, 11, 13, 5, 6]\nfor i in range(1, len(arr)):\n    key = arr[i]\n    j = i - 1\n    while j >= 0 and arr[j] > key:\n        arr[j + 1] = arr[j]\n        j -= 1\n    arr[j + 1] = key\nprint(arr)", output: "[5, 6, 11, 12, 13]" },
{ id: 17, cat: "python", title: "Linear Search", q: "Write a Python program to search an element in a list using linear search.", code: "arr = [10, 20, 30, 40, 50]\nkey = 30\nfound = -1\nfor i in range(len(arr)):\n    if arr[i] == key:\n        found = i\n        break\nprint('Found at index', found)", output: "Found at index 2" },
{ id: 18, cat: "python", title: "Binary Search", q: "Write a Python program to search an element in a sorted list using binary search.", code: "arr = [10, 20, 30, 40, 50]\nkey = 40\nlow, high = 0, len(arr) - 1\npos = -1\nwhile low <= high:\n    mid = (low + high) // 2\n    if arr[mid] == key:\n        pos = mid; break\n    elif arr[mid] < key:\n        low = mid + 1\n    else:\n        high = mid - 1\nprint('Position:', pos)", output: "Position: 3" },
{ id: 19, cat: "python", title: "Merge Two Lists", q: "Write a Python program to merge two lists and sort the result.", code: "a = [3, 1, 5]\nb = [4, 2, 6]\nprint(sorted(a + b))", output: "[1, 2, 3, 4, 5, 6]" },
{ id: 20, cat: "python", title: "Remove Duplicates from List", q: "Write a Python program to remove duplicate elements from a list.", code: "arr = [1, 2, 2, 3, 4, 4, 5]\nunique = list(dict.fromkeys(arr))\nprint(unique)", output: "[1, 2, 3, 4, 5]" },
{ id: 21, cat: "python", title: "Frequency of Elements in List", q: "Write a Python program to count the frequency of each element in a list.", code: "arr = [1, 2, 2, 3, 1, 4]\nfreq = {}\nfor x in arr:\n    freq[x] = freq.get(x, 0) + 1\nprint(freq)", output: "{1: 2, 2: 2, 3: 1, 4: 1}" },
{ id: 22, cat: "python", title: "Word Frequency Using Dictionary", q: "Write a Python program to count the frequency of words in a sentence using a dictionary.", code: "text = 'the cat and the dog'\nfreq = {}\nfor w in text.split():\n    freq[w] = freq.get(w, 0) + 1\nprint(freq)", output: "{'the': 2, 'cat': 1, 'and': 1, 'dog': 1}" },
{ id: 23, cat: "python", title: "Sort Dictionary by Values", q: "Write a Python program to sort a dictionary by its values.", code: "d = {'A': 30, 'B': 10, 'C': 20}\nprint(dict(sorted(d.items(), key=lambda x: x[1])))", output: "{'B': 10, 'C': 20, 'A': 30}" },
{ id: 24, cat: "python", title: "Merge Two Dictionaries", q: "Write a Python program to merge two dictionaries.", code: "d1 = {'a': 1, 'b': 2}\nd2 = {'c': 3, 'd': 4}\nprint({**d1, **d2})", output: "{'a': 1, 'b': 2, 'c': 3, 'd': 4}" },
{ id: 25, cat: "python", title: "Tuple Operations: Max, Min, Average", q: "Write a Python program to find the maximum, minimum and average of elements in a tuple.", code: "t = (12, 45, 7, 30, 18)\nprint('Max:', max(t))\nprint('Min:', min(t))\nprint('Average:', sum(t) / len(t))", output: "Max: 45\nMin: 7\nAverage: 22.4" },
{ id: 26, cat: "python", title: "Swap Two Numbers Without Third Variable", q: "Write a Python program to swap two numbers without using a third variable.", code: "a, b = 5, 9\na, b = b, a\nprint('a =', a, 'b =', b)", output: "a = 9 b = 5" },
{ id: 27, cat: "python", title: "Celsius to Fahrenheit", q: "Write a Python function to convert Celsius to Fahrenheit.", code: "def c_to_f(c):\n    return (c * 9 / 5) + 32\n\nprint(c_to_f(37))", output: "98.6" },
{ id: 28, cat: "python", title: "Simple Interest", q: "Write a Python function to calculate simple interest.", code: "def si(p, r, t):\n    return (p * r * t) / 100\n\nprint('SI:', si(10000, 5, 2))", output: "SI: 1000.0" },
{ id: 29, cat: "python", title: "Area of Circle", q: "Write a Python function to calculate the area of a circle.", code: "import math\ndef area(r):\n    return math.pi * r * r\nprint(round(area(7), 2))", output: "153.94" },
{ id: 30, cat: "python", title: "Even or Odd Function", q: "Write a Python function to check whether a number is even or odd.", code: "def check(n):\n    return 'Even' if n % 2 == 0 else 'Odd'\nprint(check(17))", output: "Odd" },
{ id: 31, cat: "python", title: "Largest of Three Numbers", q: "Write a Python program to find the largest of three numbers.", code: "a, b, c = 14, 27, 19\nprint('Largest:', max(a, b, c))", output: "Largest: 27" },
{ id: 32, cat: "python", title: "Leap Year Check", q: "Write a Python program to check whether a year is a leap year.", code: "year = 2024\nif (year % 4 == 0 and year % 100 != 0) or year % 400 == 0:\n    print('Leap Year')\nelse:\n    print('Not a Leap Year')", output: "Leap Year" },
{ id: 33, cat: "python", title: "Multiplication Table", q: "Write a Python program to print the multiplication table of a number.", code: "n = 7\nfor i in range(1, 11):\n    print(f'{n} x {i} = {n * i}')", output: "7 x 1 = 7\n7 x 2 = 14\n...\n7 x 10 = 70" },
{ id: 34, cat: "python", title: "Sum of First n Natural Numbers", q: "Write a Python program to find the sum of first n natural numbers.", code: "n = 10\nprint('Sum:', n * (n + 1) // 2)", output: "Sum: 55" },
{ id: 35, cat: "python", title: "Sum of Even Numbers up to n", q: "Write a Python program to find the sum of all even numbers up to n.", code: "n = 20\nprint('Sum of evens:', sum(i for i in range(2, n + 1, 2)))", output: "Sum of evens: 110" },
{ id: 36, cat: "python", title: "Print Prime Numbers from 1 to n", q: "Write a Python program to print all prime numbers from 1 to n.", code: "n = 30\nfor num in range(2, n + 1):\n    for i in range(2, int(num ** 0.5) + 1):\n        if num % i == 0:\n            break\n    else:\n        print(num, end=' ')", output: "2 3 5 7 11 13 17 19 23 29" },
{ id: 37, cat: "python", title: "Pyramid Pattern", q: "Write a Python program to print a pyramid pattern of stars.", code: "n = 5\nfor i in range(1, n + 1):\n    print(' ' * (n - i) + '*' * (2 * i - 1))", output: "    *\n   ***\n  *****\n *******\n*********" },
{ id: 38, cat: "python", title: "Floyd's Triangle", q: "Write a Python program to print Floyd's triangle.", code: "n = 4\nnum = 1\nfor i in range(1, n + 1):\n    for j in range(i):\n        print(num, end=' ')\n        num += 1\n    print()", output: "1\n2 3\n4 5 6\n7 8 9 10" },
{ id: 39, cat: "python", title: "Count Characters in a File", q: "Write a Python program to count the number of characters in a text file.", code: "with open('data.txt', 'r') as f:\n    content = f.read()\nprint('Characters:', len(content))", output: "Characters: 120" },
{ id: 40, cat: "python", title: "Count Words in a File", q: "Write a Python program to count the number of words in a text file.", code: "with open('data.txt', 'r') as f:\n    words = f.read().split()\nprint('Words:', len(words))", output: "Words: 24" },
{ id: 41, cat: "python", title: "Count Lines in a File", q: "Write a Python program to count the number of lines in a text file.", code: "with open('data.txt', 'r') as f:\n    lines = f.readlines()\nprint('Lines:', len(lines))", output: "Lines: 6" },
{ id: 42, cat: "python", title: "Copy One File to Another", q: "Write a Python program to copy the contents of one file to another.", code: "with open('source.txt', 'r') as src:\n    data = src.read()\nwith open('target.txt', 'w') as dst:\n    dst.write(data)\nprint('File copied.')", output: "File copied." },
{ id: 43, cat: "python", title: "Read First n Lines of a File", q: "Write a Python program to read and display the first n lines of a file.", code: "n = 3\nwith open('data.txt', 'r') as f:\n    for i in range(n):\n        print(f.readline().strip())", output: "Line 1\nLine 2\nLine 3" },
{ id: 44, cat: "python", title: "Append Text to a File", q: "Write a Python program to append a new line to an existing text file.", code: "with open('data.txt', 'a') as f:\n    f.write('\\nNew record appended.')\nprint('Appended.')", output: "Appended." },
{ id: 45, cat: "python", title: "Find Word Occurrences in a File", q: "Write a Python program to count how many times a given word appears in a file.", code: "word = 'python'\ncount = 0\nwith open('data.txt', 'r') as f:\n    for line in f:\n        count += line.lower().split().count(word.lower())\nprint('Occurrences:', count)", output: "Occurrences: 5" },
{ id: 46, cat: "python", title: "Remove Blank Lines from a File", q: "Write a Python program to remove blank lines from a text file.", code: "with open('data.txt', 'r') as f:\n    lines = f.readlines()\nwith open('clean.txt', 'w') as f:\n    for line in lines:\n        if line.strip():\n            f.write(line)\nprint('Blank lines removed.')", output: "Blank lines removed." },
{ id: 47, cat: "python", title: "Count Vowels in a File", q: "Write a Python program to count the number of vowels present in a text file.", code: "vowels = 'aeiouAEIOU'\ncount = 0\nwith open('data.txt', 'r') as f:\n    for ch in f.read():\n        if ch in vowels:\n            count += 1\nprint('Vowels:', count)", output: "Vowels: 42" },
{ id: 48, cat: "python", title: "Display Lines Starting with a Vowel", q: "Write a Python program to display all lines of a file that start with a vowel.", code: "vowels = 'aeiouAEIOU'\nwith open('data.txt', 'r') as f:\n    for line in f:\n        if line.strip() and line[0] in vowels:\n            print(line.strip())", output: "Artificial Intelligence is transforming education." },
{ id: 49, cat: "python", title: "Write a List to a File", q: "Write a Python program to write a list of strings to a text file, one per line.", code: "items = ['Apple', 'Banana', 'Cherry']\nwith open('fruits.txt', 'w') as f:\n    for item in items:\n        f.write(item + '\\n')\nprint('List written.')", output: "List written." },
{ id: 50, cat: "python", title: "Read a CSV File", q: "Write a Python program to read and display the contents of a CSV file using the csv module.", code: "import csv\nwith open('students.csv', 'r') as f:\n    reader = csv.reader(f)\n    for row in reader:\n        print(row)", output: "['Roll', 'Name', 'Marks']\n[1, 'Amit', 88]\n[2, 'Priya', 92]" },
{ id: 51, cat: "python", title: "Write Records to a CSV File", q: "Write a Python program to write student records to a CSV file.", code: "import csv\nrows = [[1, 'Amit', 88], [2, 'Priya', 92]]\nwith open('students.csv', 'w', newline='') as f:\n    writer = csv.writer(f)\n    writer.writerow(['Roll', 'Name', 'Marks'])\n    writer.writerows(rows)\nprint('CSV written.')", output: "CSV written." },
{ id: 52, cat: "python", title: "Read CSV and Compute Average", q: "Write a Python program to read marks from a CSV file and compute the average marks.", code: "import csv\ntotal, count = 0, 0\nwith open('students.csv', 'r') as f:\n    reader = csv.DictReader(f)\n    for row in reader:\n        total += int(row['Marks'])\n        count += 1\nprint('Average:', total / count)", output: "Average: 90.0" },
{ id: 53, cat: "python", title: "Write Records to a Binary File", q: "Write a Python program to write student records to a binary file using pickle.", code: "import pickle\nrecords = [{'Roll': 1, 'Name': 'Amit', 'Marks': 88}]\nwith open('students.dat', 'wb') as f:\n    pickle.dump(records, f)\nprint('Binary file written.')", output: "Binary file written." },
{ id: 54, cat: "python", title: "Read Records from a Binary File", q: "Write a Python program to read and display records from a binary file using pickle.", code: "import pickle\nwith open('students.dat', 'rb') as f:\n    records = pickle.load(f)\nfor r in records:\n    print(r)", output: "{'Roll': 1, 'Name': 'Amit', 'Marks': 88}" },
{ id: 55, cat: "python", title: "Search a Record in a Binary File", q: "Write a Python program to search for a student record by roll number in a binary file.", code: "import pickle\nroll = 2\nwith open('students.dat', 'rb') as f:\n    records = pickle.load(f)\nfor r in records:\n    if r['Roll'] == roll:\n        print('Found:', r)\n        break", output: "Found: {'Roll': 2, 'Name': 'Priya', 'Marks': 92}" },
{ id: 56, cat: "python", title: "Count Records in a Binary File", q: "Write a Python program to count the total number of records in a binary file.", code: "import pickle\nwith open('students.dat', 'rb') as f:\n    records = pickle.load(f)\nprint('Total records:', len(records))", output: "Total records: 2" },
{ id: 57, cat: "python", title: "Stack Using List: Push and Pop", q: "Write a Python program to implement stack operations push and pop using a list.", code: "stack = []\nstack.append(10)\nstack.append(20)\nstack.append(30)\nprint('Popped:', stack.pop())\nprint('Stack:', stack)", output: "Popped: 30\nStack: [10, 20]" },
{ id: 58, cat: "python", title: "Stack Class with Push, Pop, Peek", q: "Write a Python class to implement a stack with push, pop and peek operations.", code: "class Stack:\n    def __init__(self):\n        self.items = []\n    def push(self, x):\n        self.items.append(x)\n    def pop(self):\n        return self.items.pop() if self.items else None\n    def peek(self):\n        return self.items[-1] if self.items else None\n\ns = Stack()\ns.push(5); s.push(15)\nprint('Peek:', s.peek())\nprint('Pop:', s.pop())", output: "Peek: 15\nPop: 15" },
{ id: 59, cat: "python", title: "Balanced Parentheses Using Stack", q: "Write a Python program to check whether parentheses in an expression are balanced using a stack.", code: "def is_balanced(expr):\n    stack = []\n    pairs = {')': '(', ']': '[', '}': '{'}\n    for ch in expr:\n        if ch in '([{':\n            stack.append(ch)\n        elif ch in pairs:\n            if not stack or stack.pop() != pairs[ch]:\n                return False\n    return not stack\n\nprint(is_balanced('(a+b)*[c-d]'))", output: "True" },
{ id: 60, cat: "python", title: "Infix to Postfix Conversion", q: "Write a Python program to convert an infix expression to postfix using a stack.", code: "def prec(op):\n    return {'+':1,'-':1,'*':2,'/':2}.get(op,0)\n\ndef infix_to_postfix(expr):\n    stack, out = [], ''\n    for ch in expr:\n        if ch.isalnum():\n            out += ch\n        elif ch == '(':\n            stack.append(ch)\n        elif ch == ')':\n            while stack and stack[-1] != '(':\n                out += stack.pop()\n            stack.pop()\n        else:\n            while stack and prec(stack[-1]) >= prec(ch):\n                out += stack.pop()\n            stack.append(ch)\n    while stack:\n        out += stack.pop()\n    return out\n\nprint(infix_to_postfix('A+B*C'))", output: "ABC*+" },
{ id: 61, cat: "python", title: "Evaluate a Postfix Expression", q: "Write a Python program to evaluate a postfix expression using a stack.", code: "def evaluate(expr):\n    stack = []\n    for ch in expr.split():\n        if ch.isdigit():\n            stack.append(int(ch))\n        else:\n            b = stack.pop(); a = stack.pop()\n            if ch == '+': stack.append(a + b)\n            elif ch == '-': stack.append(a - b)\n            elif ch == '*': stack.append(a * b)\n            elif ch == '/': stack.append(a // b)\n    return stack[0]\n\nprint(evaluate('5 3 + 2 *'))", output: "16" },
{ id: 62, cat: "python", title: "Menu Driven Stack Program", q: "Write a menu-driven Python program to perform stack operations: push, pop and display.", code: "stack = []\nwhile True:\n    print('1.Push 2.Pop 3.Display 4.Exit')\n    ch = int(input('Choice: '))\n    if ch == 1:\n        stack.append(int(input('Value: ')))\n    elif ch == 2:\n        print('Popped:', stack.pop() if stack else 'Empty')\n    elif ch == 3:\n        print(stack)\n    else:\n        break", output: "Choice: 1\nValue: 10\n[10]" },
{ id: 63, cat: "python", title: "Palindrome Check Using Stack", q: "Write a Python program to check whether a string is a palindrome using a stack.", code: "s = 'racecar'\nstack = list(s)\nrev = ''\nwhile stack:\n    rev += stack.pop()\nprint('Palindrome' if s == rev else 'Not Palindrome')", output: "Palindrome" },
{ id: 64, cat: "python", title: "Sum of Series 1 + 1/2 + 1/3 ...", q: "Write a Python program to compute the sum of the series 1 + 1/2 + 1/3 + ... up to n terms.", code: "n = 5\ntotal = sum(1 / i for i in range(1, n + 1))\nprint('Sum:', round(total, 4))", output: "Sum: 2.2833" },
{ id: 65, cat: "python", title: "Sum of Series x + x^2/2! + ...", q: "Write a Python program to compute the sum of the series x + x^2/2! + x^3/3! + ... up to n terms.", code: "import math\nx, n = 2, 4\ntotal = sum((x ** i) / math.factorial(i) for i in range(1, n + 1))\nprint('Sum:', round(total, 4))", output: "Sum: 6.0" },
{ id: 66, cat: "python", title: "Sine Series", q: "Write a Python program to compute sin(x) using the series x - x^3/3! + x^5/5! - ...", code: "import math\nx = math.radians(30)\ntotal = 0\nfor i in range(5):\n    total += ((-1) ** i) * (x ** (2 * i + 1)) / math.factorial(2 * i + 1)\nprint('sin(30):', round(total, 4))", output: "sin(30): 0.5" },
{ id: 67, cat: "python", title: "Generate Random Numbers", q: "Write a Python program to generate five random integers between 1 and 50.", code: "import random\nfor _ in range(5):\n    print(random.randint(1, 50), end=' ')", output: "17 42 8 33 26" },
{ id: 68, cat: "python", title: "Random Password Generator", q: "Write a Python program to generate a random password of length 8 using letters, digits and symbols.", code: "import random, string\nchars = string.ascii_letters + string.digits + '!@#$%^&*'\nprint(''.join(random.choice(chars) for _ in range(8)))", output: "A7#kL2@q" },
{ id: 69, cat: "python", title: "Rock Paper Scissors Game", q: "Write a Python program to play a single round of rock-paper-scissors against the computer.", code: "import random\nchoices = ['rock', 'paper', 'scissors']\ncomputer = random.choice(choices)\nplayer = input('rock/paper/scissors: ').lower()\nprint('Computer:', computer)\nif player == computer: print('Draw')\nelif (player, computer) in [('rock','scissors'),('paper','rock'),('scissors','paper')]: print('You win!')\nelse: print('Computer wins!')", output: "Computer: paper\nYou win!" },
{ id: 70, cat: "python", title: "Dice Roll Simulation", q: "Write a Python program to simulate rolling a dice 10 times and display the outcomes.", code: "import random\nfor _ in range(10):\n    print(random.randint(1, 6), end=' ')", output: "4 2 6 1 3 5 6 2 4 1" },
{ id: 71, cat: "python", title: "Shuffle a List Randomly", q: "Write a Python program to shuffle the elements of a list randomly.", code: "import random\narr = [1, 2, 3, 4, 5]\nrandom.shuffle(arr)\nprint(arr)", output: "[3, 1, 5, 2, 4]" },
{ id: 72, cat: "python", title: "Lambda Function to Square List", q: "Write a Python program using lambda and map to square every element of a list.", code: "nums = [1, 2, 3, 4]\nprint(list(map(lambda x: x * x, nums)))", output: "[1, 4, 9, 16]" },
{ id: 73, cat: "python", title: "Map to Convert Strings to Uppercase", q: "Write a Python program using map to convert all strings in a list to uppercase.", code: "words = ['python', 'sql', 'cbse']\nprint(list(map(str.upper, words)))", output: "['PYTHON', 'SQL', 'CBSE']" },
{ id: 74, cat: "python", title: "Filter Even Numbers", q: "Write a Python program using filter to extract even numbers from a list.", code: "nums = [1, 2, 3, 4, 5, 6]\nprint(list(filter(lambda x: x % 2 == 0, nums)))", output: "[2, 4, 6]" },
{ id: 75, cat: "python", title: "Reduce to Compute Product", q: "Write a Python program using reduce to compute the product of all elements in a list.", code: "from functools import reduce\nnums = [1, 2, 3, 4, 5]\nprint('Product:', reduce(lambda a, b: a * b, nums))", output: "Product: 120" },
{ id: 76, cat: "python", title: "Sort List of Tuples by Second Element", q: "Write a Python program to sort a list of tuples based on the second element.", code: "data = [('A', 30), ('B', 10), ('C', 20)]\nprint(sorted(data, key=lambda x: x[1]))", output: "[('B', 10), ('C', 20), ('A', 30)]" },
{ id: 77, cat: "python", title: "Sort List of Dictionaries by Key", q: "Write a Python program to sort a list of dictionaries by a given key.", code: "students = [{'name': 'A', 'marks': 88}, {'name': 'B', 'marks': 92}]\nprint(sorted(students, key=lambda x: x['marks']))", output: "[{'name': 'A', 'marks': 88}, {'name': 'B', 'marks': 92}]" },
{ id: 78, cat: "python", title: "Matrix Addition", q: "Write a Python program to add two matrices.", code: "A = [[1, 2], [3, 4]]\nB = [[5, 6], [7, 8]]\nC = [[A[i][j] + B[i][j] for j in range(2)] for i in range(2)]\nprint(C)", output: "[[6, 8], [10, 12]]" },
{ id: 79, cat: "python", title: "Matrix Multiplication", q: "Write a Python program to multiply two 2x2 matrices.", code: "A = [[1, 2], [3, 4]]\nB = [[5, 6], [7, 8]]\nC = [[sum(A[i][k] * B[k][j] for k in range(2)) for j in range(2)] for i in range(2)]\nprint(C)", output: "[[19, 22], [43, 50]]" },
{ id: 80, cat: "python", title: "Transpose of a Matrix", q: "Write a Python program to find the transpose of a matrix.", code: "A = [[1, 2, 3], [4, 5, 6]]\nT = [[A[i][j] for i in range(len(A))] for j in range(len(A[0]))]\nprint(T)", output: "[[1, 4], [2, 5], [3, 6]]" },
{ id: 81, cat: "python", title: "Sum of Diagonal Elements", q: "Write a Python program to find the sum of the principal diagonal elements of a square matrix.", code: "A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nprint('Diagonal sum:', sum(A[i][i] for i in range(3)))", output: "Diagonal sum: 15" },
{ id: 82, cat: "python", title: "Identity Matrix Check", q: "Write a Python program to check whether a given matrix is an identity matrix.", code: "A = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]\nok = all(A[i][j] == (1 if i == j else 0) for i in range(3) for j in range(3))\nprint('Identity' if ok else 'Not Identity')", output: "Identity" },
{ id: 83, cat: "python", title: "Count Uppercase and Lowercase Letters", q: "Write a Python program to count uppercase and lowercase letters in a string.", code: "s = 'Hello World'\nu = sum(1 for ch in s if ch.isupper())\nl = sum(1 for ch in s if ch.islower())\nprint('Upper:', u, 'Lower:', l)", output: "Upper: 2 Lower: 8" },
{ id: 84, cat: "python", title: "Remove Punctuation from String", q: "Write a Python program to remove all punctuation marks from a string.", code: "import string\ns = 'Hello, World! Python is fun.'\nprint(s.translate(str.maketrans('', '', string.punctuation)))", output: "Hello World Python is fun" },
{ id: 85, cat: "python", title: "Capitalize Each Word", q: "Write a Python program to capitalize the first letter of each word in a string.", code: "s = 'artificial intelligence'\nprint(s.title())", output: "Artificial Intelligence" },
{ id: 86, cat: "python", title: "Find the Longest Word", q: "Write a Python program to find the longest word in a sentence.", code: "s = 'Python makes data science easy'\nprint(max(s.split(), key=len))", output: "science" },
{ id: 87, cat: "python", title: "Anagram Check", q: "Write a Python program to check whether two strings are anagrams.", code: "a, b = 'listen', 'silent'\nprint('Anagram' if sorted(a) == sorted(b) else 'Not Anagram')", output: "Anagram" },
{ id: 88, cat: "python", title: "Sum of List Using Recursion", q: "Write a recursive Python function to find the sum of elements in a list.", code: "def rec_sum(lst):\n    if not lst:\n        return 0\n    return lst[0] + rec_sum(lst[1:])\n\nprint(rec_sum([1, 2, 3, 4]))", output: "10" },
{ id: 89, cat: "python", title: "Reverse a List Using Recursion", q: "Write a recursive Python function to reverse a list.", code: "def reverse(lst):\n    if len(lst) <= 1:\n        return lst\n    return reverse(lst[1:]) + [lst[0]]\n\nprint(reverse([1, 2, 3, 4]))", output: "[4, 3, 2, 1]" },
{ id: 90, cat: "python", title: "Power Using Recursion", q: "Write a recursive Python function to compute x raised to the power n.", code: "def power(x, n):\n    if n == 0:\n        return 1\n    return x * power(x, n - 1)\n\nprint(power(2, 5))", output: "32" },
{ id: 91, cat: "python", title: "Tower of Hanoi", q: "Write a recursive Python program to solve the Tower of Hanoi problem for n disks.", code: "def hanoi(n, src, aux, dst):\n    if n == 1:\n        print(f'Move disk 1 from {src} to {dst}')\n        return\n    hanoi(n - 1, src, dst, aux)\n    print(f'Move disk {n} from {src} to {dst}')\n    hanoi(n - 1, aux, src, dst)\n\nhanoi(2, 'A', 'B', 'C')", output: "Move disk 1 from A to B\nMove disk 2 from A to C\nMove disk 1 from B to C" },
{ id: 92, cat: "python", title: "Perfect Number Check", q: "Write a Python program to check whether a number is a perfect number.", code: "n = 28\ntotal = sum(i for i in range(1, n) if n % i == 0)\nprint('Perfect' if total == n else 'Not Perfect')", output: "Perfect" },
{ id: 93, cat: "python", title: "Menu Driven Calculator", q: "Write a menu-driven Python program to perform basic arithmetic operations.", code: "while True:\n    print('1.Add 2.Sub 3.Mul 4.Div 5.Exit')\n    ch = int(input('Choice: '))\n    if ch == 5: break\n    a, b = float(input('A: ')), float(input('B: '))\n    if ch == 1: print(a + b)\n    elif ch == 2: print(a - b)\n    elif ch == 3: print(a * b)\n    elif ch == 4: print(a / b)", output: "Choice: 1\nA: 5\nB: 3\n8.0" },
{ id: 94, cat: "python", title: "Binary Search Using Recursion", q: "Write a recursive Python function to perform binary search on a sorted list.", code: "def bsearch(arr, low, high, key):\n    if low > high:\n        return -1\n    mid = (low + high) // 2\n    if arr[mid] == key:\n        return mid\n    elif arr[mid] < key:\n        return bsearch(arr, mid + 1, high, key)\n    return bsearch(arr, low, mid - 1, key)\n\nprint(bsearch([10, 20, 30, 40], 0, 3, 30))", output: "2" },
{ id: 95, cat: "python", title: "Count Frequency of Characters", q: "Write a Python program to count the frequency of each character in a string.", code: "s = 'python'\nfreq = {}\nfor ch in s:\n    freq[ch] = freq.get(ch, 0) + 1\nprint(freq)", output: "{'p': 1, 'y': 1, 't': 1, 'h': 1, 'o': 1, 'n': 1}" },
{ id: 96, cat: "python", title: "Replace a Word in a File", q: "Write a Python program to replace all occurrences of a word in a file with another word.", code: "with open('data.txt', 'r') as f:\n    text = f.read()\ntext = text.replace('old', 'new')\nwith open('data.txt', 'w') as f:\n    f.write(text)\nprint('Replaced.')", output: "Replaced." },
{ id: 97, cat: "python", title: "Merge Two Files", q: "Write a Python program to merge the contents of two text files into a third file.", code: "with open('file1.txt', 'r') as f1, open('file2.txt', 'r') as f2:\n    data1, data2 = f1.read(), f2.read()\nwith open('merged.txt', 'w') as f3:\n    f3.write(data1 + '\\n' + data2)\nprint('Merged.')", output: "Merged." },
{ id: 98, cat: "python", title: "Student Result Dictionary", q: "Write a Python program to store student marks in a dictionary and display the topper.", code: "marks = {'Amit': 88, 'Priya': 92, 'Rahul': 79}\ntopper = max(marks, key=marks.get)\nprint('Topper:', topper, marks[topper])", output: "Topper: Priya 92" },
{ id: 99, cat: "python", title: "Inventory Management Using Dictionary", q: "Write a Python program to maintain an inventory using a dictionary and update stock.", code: "inventory = {'pen': 10, 'book': 5}\ninventory['pen'] += 5\ninventory['pencil'] = 20\nprint(inventory)", output: "{'pen': 15, 'book': 5, 'pencil': 20}" },
{ id: 100, cat: "python", title: "Telephone Directory Using Dictionary", q: "Write a Python program to create a telephone directory and search for a contact.", code: "directory = {'Amit': '9876543210', 'Priya': '9123456780'}\nprint(directory.get('Priya', 'Not found'))", output: "9123456780" },
{ id: 101, cat: "sql", title: "Create STUDENT Table", q: "Write an SQL query to create a table STUDENT with columns ROLLNO (integer primary key), NAME (varchar 30), CLASS (varchar 10) and MARKS (integer).", code: "CREATE TABLE STUDENT (\n  ROLLNO INT PRIMARY KEY,\n  NAME VARCHAR(30),\n  CLASS VARCHAR(10),\n  MARKS INT\n);", output: "Query OK, table created." },
{ id: 102, cat: "sql", title: "Insert Rows into STUDENT", q: "Write an SQL query to insert three records into the STUDENT table.", code: "INSERT INTO STUDENT VALUES\n(1, 'Amit', 'XII', 88),\n(2, 'Priya', 'XII', 92),\n(3, 'Rahul', 'XII', 79);", output: "3 rows inserted." },
{ id: 103, cat: "sql", title: "Select All Records", q: "Write an SQL query to display all records from the STUDENT table.", code: "SELECT * FROM STUDENT;", output: "ROLLNO | NAME  | CLASS | MARKS\n1      | Amit  | XII   | 88\n2      | Priya | XII   | 92\n3      | Rahul | XII   | 79" },
{ id: 104, cat: "sql", title: "Select Specific Columns", q: "Write an SQL query to display only NAME and MARKS from the STUDENT table.", code: "SELECT NAME, MARKS FROM STUDENT;", output: "NAME  | MARKS\nAmit  | 88\nPriya | 92\nRahul | 79" },
{ id: 105, cat: "sql", title: "WHERE Clause with Marks", q: "Write an SQL query to display students who scored more than 80 marks.", code: "SELECT * FROM STUDENT WHERE MARKS > 80;", output: "ROLLNO | NAME  | CLASS | MARKS\n1      | Amit  | XII   | 88\n2      | Priya | XII   | 92" },
{ id: 106, cat: "sql", title: "ORDER BY Marks", q: "Write an SQL query to display all students sorted by marks in descending order.", code: "SELECT * FROM STUDENT ORDER BY MARKS DESC;", output: "ROLLNO | NAME  | CLASS | MARKS\n2      | Priya | XII   | 92\n1      | Amit  | XII   | 88\n3      | Rahul | XII   | 79" },
{ id: 107, cat: "sql", title: "DISTINCT Values", q: "Write an SQL query to display distinct CLASS values from the STUDENT table.", code: "SELECT DISTINCT CLASS FROM STUDENT;", output: "CLASS\nXII" },
{ id: 108, cat: "sql", title: "BETWEEN Operator", q: "Write an SQL query to display students whose marks are between 80 and 90.", code: "SELECT * FROM STUDENT WHERE MARKS BETWEEN 80 AND 90;", output: "ROLLNO | NAME | CLASS | MARKS\n1      | Amit | XII   | 88" },
{ id: 109, cat: "sql", title: "IN Operator", q: "Write an SQL query to display students whose roll numbers are 1 or 3.", code: "SELECT * FROM STUDENT WHERE ROLLNO IN (1, 3);", output: "ROLLNO | NAME  | CLASS | MARKS\n1      | Amit  | XII   | 88\n3      | Rahul | XII   | 79" },
{ id: 110, cat: "sql", title: "LIKE Operator", q: "Write an SQL query to display students whose names start with the letter 'A'.", code: "SELECT * FROM STUDENT WHERE NAME LIKE 'A%';", output: "ROLLNO | NAME | CLASS | MARKS\n1      | Amit | XII   | 88" },
{ id: 111, cat: "sql", title: "COUNT Function", q: "Write an SQL query to count the total number of students in the STUDENT table.", code: "SELECT COUNT(*) AS TOTAL FROM STUDENT;", output: "TOTAL\n3" },
{ id: 112, cat: "sql", title: "SUM Function", q: "Write an SQL query to find the total marks of all students.", code: "SELECT SUM(MARKS) AS TOTAL_MARKS FROM STUDENT;", output: "TOTAL_MARKS\n259" },
{ id: 113, cat: "sql", title: "AVG Function", q: "Write an SQL query to find the average marks of students.", code: "SELECT AVG(MARKS) AS AVG_MARKS FROM STUDENT;", output: "AVG_MARKS\n86.3333" },
{ id: 114, cat: "sql", title: "MAX and MIN Functions", q: "Write an SQL query to display the highest and lowest marks.", code: "SELECT MAX(MARKS) AS HIGHEST, MIN(MARKS) AS LOWEST FROM STUDENT;", output: "HIGHEST | LOWEST\n92      | 79" },
{ id: 115, cat: "sql", title: "GROUP BY with COUNT", q: "Write an SQL query to count the number of students in each class.", code: "SELECT CLASS, COUNT(*) AS TOTAL FROM STUDENT GROUP BY CLASS;", output: "CLASS | TOTAL\nXII   | 3" },
{ id: 116, cat: "sql", title: "GROUP BY with HAVING", q: "Write an SQL query to display classes having more than 1 student.", code: "SELECT CLASS, COUNT(*) AS TOTAL\nFROM STUDENT\nGROUP BY CLASS\nHAVING COUNT(*) > 1;", output: "CLASS | TOTAL\nXII   | 3" },
{ id: 117, cat: "sql", title: "GROUP BY with SUM", q: "Write an SQL query to find the total marks class-wise.", code: "SELECT CLASS, SUM(MARKS) AS TOTAL\nFROM STUDENT\nGROUP BY CLASS;", output: "CLASS | TOTAL\nXII   | 259" },
{ id: 118, cat: "sql", title: "Join EMP and DEPT Tables", q: "Table EMP(EMPNO, ENAME, SAL, DEPTNO) and DEPT(DEPTNO, DNAME). Write an SQL query to display employee name with department name.", code: "SELECT E.ENAME, D.DNAME\nFROM EMP E\nJOIN DEPT D ON E.DEPTNO = D.DEPTNO;", output: "ENAME | DNAME\nAmit  | Sales\nPriya | HR" },
{ id: 119, cat: "sql", title: "Left Join", q: "Write an SQL query using LEFT JOIN to display all departments and their employees, including departments with no employees.", code: "SELECT D.DNAME, E.ENAME\nFROM DEPT D\nLEFT JOIN EMP E ON D.DEPTNO = E.DEPTNO;", output: "DNAME | ENAME\nSales | Amit\nHR    | Priya\nIT    | NULL" },
{ id: 120, cat: "sql", title: "Subquery with AVG", q: "Write an SQL query to display employees whose salary is greater than the average salary.", code: "SELECT ENAME, SAL\nFROM EMP\nWHERE SAL > (SELECT AVG(SAL) FROM EMP);", output: "ENAME | SAL\nPriya | 70000" },
{ id: 121, cat: "sql", title: "Subquery with IN", q: "Write an SQL query to display employees working in the 'Sales' department using a subquery.", code: "SELECT ENAME FROM EMP\nWHERE DEPTNO IN (SELECT DEPTNO FROM DEPT WHERE DNAME = 'Sales');", output: "ENAME\nAmit" },
{ id: 122, cat: "sql", title: "EXISTS Operator", q: "Write an SQL query using EXISTS to display departments that have at least one employee.", code: "SELECT DNAME FROM DEPT D\nWHERE EXISTS (SELECT 1 FROM EMP E WHERE E.DEPTNO = D.DEPTNO);", output: "DNAME\nSales\nHR" },
{ id: 123, cat: "sql", title: "UPDATE Salary", q: "Write an SQL query to increase the salary of all employees in department 10 by 10%.", code: "UPDATE EMP\nSET SAL = SAL * 1.10\nWHERE DEPTNO = 10;", output: "Rows updated." },
{ id: 124, cat: "sql", title: "DELETE a Row", q: "Write an SQL query to delete the employee whose EMPNO is 3.", code: "DELETE FROM EMP WHERE EMPNO = 3;", output: "1 row deleted." },
{ id: 125, cat: "sql", title: "ALTER TABLE Add Column", q: "Write an SQL query to add a column EMAIL to the STUDENT table.", code: "ALTER TABLE STUDENT ADD EMAIL VARCHAR(50);", output: "Column added." },
{ id: 126, cat: "sql", title: "ALTER TABLE Modify Column", q: "Write an SQL query to change the size of the NAME column in STUDENT to VARCHAR(50).", code: "ALTER TABLE STUDENT MODIFY NAME VARCHAR(50);", output: "Column modified." },
{ id: 127, cat: "sql", title: "ALTER TABLE Drop Column", q: "Write an SQL query to drop the EMAIL column from the STUDENT table.", code: "ALTER TABLE STUDENT DROP COLUMN EMAIL;", output: "Column dropped." },
{ id: 128, cat: "sql", title: "PRIMARY KEY Constraint", q: "Write an SQL query to create a table EMP with EMPNO as the primary key.", code: "CREATE TABLE EMP (\n  EMPNO INT PRIMARY KEY,\n  ENAME VARCHAR(30),\n  SAL INT\n);", output: "Table created." },
{ id: 129, cat: "sql", title: "FOREIGN KEY Constraint", q: "Write an SQL query to create a table EMP with DEPTNO as a foreign key referencing DEPT(DEPTNO).", code: "CREATE TABLE EMP (\n  EMPNO INT PRIMARY KEY,\n  ENAME VARCHAR(30),\n  DEPTNO INT,\n  FOREIGN KEY (DEPTNO) REFERENCES DEPT(DEPTNO)\n);", output: "Table created." },
{ id: 130, cat: "sql", title: "UNIQUE Constraint", q: "Write an SQL query to create a table with a UNIQUE constraint on the EMAIL column.", code: "CREATE TABLE USERS (\n  ID INT PRIMARY KEY,\n  EMAIL VARCHAR(50) UNIQUE\n);", output: "Table created." },
{ id: 131, cat: "sql", title: "DEFAULT Constraint", q: "Write an SQL query to create a table with a DEFAULT value for the CITY column.", code: "CREATE TABLE CUSTOMER (\n  ID INT PRIMARY KEY,\n  NAME VARCHAR(30),\n  CITY VARCHAR(20) DEFAULT 'Delhi'\n);", output: "Table created." },
{ id: 132, cat: "sql", title: "CHECK Constraint", q: "Write an SQL query to create a table with a CHECK constraint ensuring marks are between 0 and 100.", code: "CREATE TABLE RESULT (\n  ROLLNO INT PRIMARY KEY,\n  MARKS INT CHECK (MARKS BETWEEN 0 AND 100)\n);", output: "Table created." },
{ id: 133, cat: "sql", title: "Arithmetic Expression in SELECT", q: "Write an SQL query to display employee name and salary after a 5% increment.", code: "SELECT ENAME, SAL * 1.05 AS NEW_SAL FROM EMP;", output: "ENAME | NEW_SAL\nAmit  | 52500\nPriya | 73500" },
{ id: 134, cat: "sql", title: "CONCAT Function", q: "Write an SQL query to display employee names with their department names concatenated.", code: "SELECT CONCAT(ENAME, ' - ', DNAME) AS DETAILS\nFROM EMP E JOIN DEPT D ON E.DEPTNO = D.DEPTNO;", output: "DETAILS\nAmit - Sales\nPriya - HR" },
{ id: 135, cat: "sql", title: "UPPER and LOWER Functions", q: "Write an SQL query to display employee names in uppercase and lowercase.", code: "SELECT UPPER(ENAME), LOWER(ENAME) FROM EMP;", output: "UPPER(ENAME) | LOWER(ENAME)\nAMIT         | amit\nPRIYA        | priya" },
{ id: 136, cat: "sql", title: "LENGTH Function", q: "Write an SQL query to display employee names along with their lengths.", code: "SELECT ENAME, LENGTH(ENAME) AS LEN FROM EMP;", output: "ENAME | LEN\nAmit  | 4\nPriya | 5" },
{ id: 137, cat: "sql", title: "ROUND Function", q: "Write an SQL query to display the average salary rounded to 2 decimal places.", code: "SELECT ROUND(AVG(SAL), 2) AS AVG_SAL FROM EMP;", output: "AVG_SAL\n60000.00" },
{ id: 138, cat: "sql", title: "ORDER BY Multiple Columns", q: "Write an SQL query to display employees sorted by department number and then by salary descending.", code: "SELECT * FROM EMP\nORDER BY DEPTNO ASC, SAL DESC;", output: "EMPNO | ENAME | SAL   | DEPTNO\n2     | Priya | 70000 | 20\n1     | Amit  | 50000 | 10" },
{ id: 139, cat: "sql", title: "LIMIT Clause", q: "Write an SQL query to display the top 3 highest-paid employees.", code: "SELECT * FROM EMP ORDER BY SAL DESC LIMIT 3;", output: "Top 3 rows by salary." },
{ id: 140, cat: "sql", title: "GROUP BY Multiple Columns", q: "Write an SQL query to count employees grouped by department and job.", code: "SELECT DEPTNO, JOB, COUNT(*) AS TOTAL\nFROM EMP\nGROUP BY DEPTNO, JOB;", output: "DEPTNO | JOB     | TOTAL\n10     | CLERK   | 1\n20     | ANALYST | 2" },
{ id: 141, cat: "sql", title: "Self Join", q: "Table EMP(EMPNO, ENAME, MGR). Write an SQL query to display employee names with their manager names.", code: "SELECT E.ENAME AS EMPLOYEE, M.ENAME AS MANAGER\nFROM EMP E LEFT JOIN EMP M ON E.MGR = M.EMPNO;", output: "EMPLOYEE | MANAGER\nAmit     | Rahul\nPriya    | Rahul" },
{ id: 142, cat: "sql", title: "UNION Operator", q: "Write an SQL query using UNION to combine names from two tables.", code: "SELECT ENAME FROM EMP\nUNION\nSELECT NAME FROM STUDENT;", output: "Combined unique names." },
{ id: 143, cat: "sql", title: "Create a View", q: "Write an SQL query to create a view HIGH_SAL containing employees with salary above 50000.", code: "CREATE VIEW HIGH_SAL AS\nSELECT ENAME, SAL FROM EMP WHERE SAL > 50000;", output: "View created." },
{ id: 144, cat: "sql", title: "Create an Index", q: "Write an SQL query to create an index on the NAME column of the STUDENT table.", code: "CREATE INDEX idx_student_name ON STUDENT(NAME);", output: "Index created." },
{ id: 145, cat: "sql", title: "Aggregate with WHERE", q: "Write an SQL query to find the average salary of employees in department 20.", code: "SELECT AVG(SAL) AS AVG_SAL\nFROM EMP\nWHERE DEPTNO = 20;", output: "AVG_SAL\n65000" },
{ id: 146, cat: "sql", title: "Nested Aggregate Subquery", q: "Write an SQL query to display the department with the highest average salary.", code: "SELECT DEPTNO, AVG(SAL) AS AVG_SAL\nFROM EMP\nGROUP BY DEPTNO\nHAVING AVG(SAL) = (SELECT MAX(avg_sal) FROM (SELECT AVG(SAL) AS avg_sal FROM EMP GROUP BY DEPTNO) t);", output: "DEPTNO | AVG_SAL\n20     | 65000" },
{ id: 147, cat: "sql", title: "Correlated Subquery", q: "Write an SQL query to display employees who earn more than the average salary of their own department.", code: "SELECT ENAME, SAL, DEPTNO\nFROM EMP E\nWHERE SAL > (SELECT AVG(SAL) FROM EMP WHERE DEPTNO = E.DEPTNO);", output: "ENAME | SAL   | DEPTNO\nPriya | 70000 | 20" },
{ id: 148, cat: "sql", title: "Join Three Tables", q: "Tables EMP, DEPT and LOCATION. Write an SQL query to display employee name, department name and location.", code: "SELECT E.ENAME, D.DNAME, L.CITY\nFROM EMP E\nJOIN DEPT D ON E.DEPTNO = D.DEPTNO\nJOIN LOCATION L ON D.LOCID = L.LOCID;", output: "ENAME | DNAME | CITY\nAmit  | Sales | Agra" },
{ id: 149, cat: "sql", title: "Date Function YEAR", q: "Table EMP(EMPNO, ENAME, HIREDATE). Write an SQL query to display employees hired in the year 2023.", code: "SELECT ENAME, HIREDATE\nFROM EMP\nWHERE YEAR(HIREDATE) = 2023;", output: "ENAME | HIREDATE\nAmit  | 2023-06-15" },
{ id: 150, cat: "sql", title: "CASE Expression", q: "Write an SQL query using CASE to display employee names with a salary grade (High/Medium/Low).", code: "SELECT ENAME, SAL,\nCASE\n  WHEN SAL >= 70000 THEN 'High'\n  WHEN SAL >= 50000 THEN 'Medium'\n  ELSE 'Low'\nEND AS GRADE\nFROM EMP;", output: "ENAME | SAL   | GRADE\nAmit  | 50000 | Medium\nPriya | 70000 | High" }
];

window.onload = function() {
    loadFromLocalStorage();
    renderPresetModalList();
    renderEditorList();
    renderDocumentPreview();
    highlightActiveStyles();
};

function switchTab(tabId) {
    document.querySelectorAll('#tab-intro, #tab-records, #tab-layout, #tab-meta').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('[id^="tab-btn-"]').forEach(btn => {
        btn.classList.remove('bg-[#141317]', 'text-[#c9a668]', 'border-b-2', 'border-[#c9a668]');
        btn.classList.add('text-[#8a8780]');
    });
    document.getElementById('tab-' + tabId).classList.remove('hidden');
    const activeBtn = document.getElementById('tab-btn-' + tabId);
    activeBtn.classList.add('bg-[#141317]', 'text-[#c9a668]', 'border-b-2', 'border-[#c9a668]');
    activeBtn.classList.remove('text-[#8a8780]');
}

function setCoverStyle(style) {
    state.intro.coverStyle = style;
    highlightActiveStyles();
    saveToLocalStorage();
    renderDocumentPreview();
}

function setCertStyle(style) {
    state.intro.certStyle = style;
    highlightActiveStyles();
    saveToLocalStorage();
    renderDocumentPreview();
}

function setAckStyle(style) {
    state.intro.ackStyle = style;
    highlightActiveStyles();
    saveToLocalStorage();
    renderDocumentPreview();
}

function highlightActiveStyles() {
    document.querySelectorAll('#style-classic, #style-modern, #style-formal').forEach(el => el.classList.remove('active'));
    const coverEl = document.getElementById('style-' + (state.intro.coverStyle || 'classic'));
    if (coverEl) coverEl.classList.add('active');

    document.querySelectorAll('#cert-classic, #cert-ornate, #cert-minimal').forEach(el => el.classList.remove('active'));
    const certEl = document.getElementById('cert-' + (state.intro.certStyle || 'classic'));
    if (certEl) certEl.classList.add('active');

    document.querySelectorAll('#ack-classic, #ack-formal').forEach(el => el.classList.remove('active'));
    const ackEl = document.getElementById('ack-' + (state.intro.ackStyle || 'classic'));
    if (ackEl) ackEl.classList.add('active');
}

function openPresetModal() { document.getElementById('preset-modal').classList.remove('hidden'); }
function closePresetModal() { document.getElementById('preset-modal').classList.add('hidden'); }

function setPresetCategory(cat) {
    currentPresetCat = cat;
    document.querySelectorAll('.preset-cat-btn').forEach(btn => {
        btn.classList.remove('bg-[#c9a668]', 'text-[#0d0c0f]', 'font-semibold');
        btn.classList.add('bg-[#1a191e]', 'text-slate-300');
    });
    event.target.classList.remove('bg-[#1a191e]', 'text-slate-300');
    event.target.classList.add('bg-[#c9a668]', 'text-[#0d0c0f]', 'font-semibold');
    filterPresets();
}

function filterPresets() {
    const query = document.getElementById('preset-search').value.toLowerCase();
    renderPresetModalList(query);
}

function renderPresetModalList(searchQuery = '') {
    const container = document.getElementById('preset-list-container');
    container.innerHTML = '';
    const filtered = presetLibrary.filter(item => {
        const matchesCat = currentPresetCat === 'all' || item.cat === currentPresetCat;
        const matchesQuery = item.title.toLowerCase().includes(searchQuery) || item.q.toLowerCase().includes(searchQuery);
        return matchesCat && matchesQuery;
    });
    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = "bg-[#1a191e] border border-[rgba(255,255,255,0.06)] hover:border-[#c9a668] rounded-xl p-3.5 flex flex-col justify-between transition gap-2";
        card.innerHTML = `
            <div>
                <div class="flex justify-between items-center mb-1">
                    <span class="font-bold text-slate-200 text-xs">${escapeHtml(item.title)}</span>
                    <span class="uppercase text-[9px] font-mono font-bold px-2 py-0.5 rounded ${item.cat === 'python' ? 'bg-blue-950 text-blue-300 border border-blue-800' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'}">${item.cat}</span>
                </div>
                <p class="text-[11px] text-[#8a8780] line-clamp-2">${escapeHtml(item.q)}</p>
            </div>
            <button onclick="addPresetToProject(${item.id})" class="mt-1 w-full bg-[#0d0c0f] hover:bg-[#c9a668] hover:text-[#0d0c0f] text-slate-200 border border-[rgba(255,255,255,0.06)] font-medium py-1.5 px-2 rounded-lg text-[11px] flex items-center justify-center gap-1 transition">
                <i class="fa-solid fa-plus text-[10px]"></i> Add to Project File
            </button>
        `;
        container.appendChild(card);
    });
}

function getPrefixedTitle(cat, title) {
    const typeCount = state.records.filter(r => r.type === cat).length + 1;
    const prefix = cat === 'python' ? `Python Practical ${typeCount}: ` : `SQL Practical ${typeCount}: `;
    return prefix + title;
}

function addPresetToProject(presetId) {
    const preset = presetLibrary.find(p => p.id === presetId);
    if (!preset) return;
    state.records.push({
        type: preset.cat, title: getPrefixedTitle(preset.cat, preset.title), question: preset.q,
        code: preset.code || "", codeImg: "",
        output: preset.output || "", outputImg: "", imgWidthPct: 100
    });
    saveToLocalStorage();
    renderEditorList();
    renderDocumentPreview();
    closePresetModal();
}

function addRandom15() {
    const pythonPresets = presetLibrary.filter(p => p.cat === 'python');
    const sqlPresets = presetLibrary.filter(p => p.cat === 'sql');
    const pickPy = [...pythonPresets].sort(() => Math.random() - 0.5).slice(0, 9);
    const pickSql = [...sqlPresets].sort(() => Math.random() - 0.5).slice(0, 6);
    [...pickPy, ...pickSql].forEach(preset => {
        state.records.push({
            type: preset.cat, title: getPrefixedTitle(preset.cat, preset.title), question: preset.q,
            code: preset.code || "", codeImg: "",
            output: preset.output || "", outputImg: "", imgWidthPct: 100
        });
    });
    saveToLocalStorage();
    renderEditorList();
    renderDocumentPreview();
}

function addNewBlankRecord(type) {
    const typeCount = state.records.filter(r => r.type === type).length + 1;
    state.records.push({
        type: type,
        title: type === 'python' ? `Python Practical ${typeCount}: Title Here` : `SQL Practical ${typeCount}: Title Here`,
        question: "Enter problem statement or objective here...",
        code: type === 'python' ? "# Enter Python script code here\n" : "-- Enter SQL query here\n",
        codeImg: "",
        output: "Enter output result text or table here...",
        outputImg: "", imgWidthPct: 100
    });
    saveToLocalStorage();
    renderEditorList();
    renderDocumentPreview();
}

function deleteRecord(index) {
    state.records.splice(index, 1);
    saveToLocalStorage();
    renderEditorList();
    renderDocumentPreview();
}

function moveRecord(index, dir) {
    const target = index + dir;
    if (target < 0 || target >= state.records.length) return;
    const temp = state.records[index];
    state.records[index] = state.records[target];
    state.records[target] = temp;
    saveToLocalStorage();
    renderEditorList();
    renderDocumentPreview();
}

function clearAllRecords() {
    if (confirm('Clear all practical records from project?')) {
        state.records = [];
        saveToLocalStorage();
        renderEditorList();
        renderDocumentPreview();
    }
}

function renderEditorList() {
    const container = document.getElementById('records-editor-list');
    document.getElementById('record-count-badge').innerText = state.records.length;
    container.innerHTML = '';
    state.records.forEach((rec, idx) => {
        const isPython = rec.type === 'python';
        const card = document.createElement('div');
        card.className = "bg-[#1a191e] border border-[rgba(255,255,255,0.06)] rounded-xl p-3.5 text-xs space-y-3 shadow-sm";
        card.innerHTML = `
            <div class="flex items-center justify-between gap-2 border-b border-[rgba(255,255,255,0.06)] pb-2.5">
                <div class="flex items-center gap-2">
                    <span class="font-bold text-slate-200">#${idx + 1}</span>
                    <span class="uppercase text-[9px] font-mono px-2 py-0.5 rounded ${isPython ? 'bg-blue-950 text-blue-300 border border-blue-900' : 'bg-emerald-950 text-emerald-300 border border-emerald-900'}">${rec.type}</span>
                </div>
                <div class="flex items-center gap-1">
                    <button onclick="moveRecord(${idx}, -1)" class="p-1 hover:bg-[#222128] rounded text-[#8a8780] hover:text-white" title="Move Up"><i class="fa-solid fa-arrow-up"></i></button>
                    <button onclick="moveRecord(${idx}, 1)" class="p-1 hover:bg-[#222128] rounded text-[#8a8780] hover:text-white" title="Move Down"><i class="fa-solid fa-arrow-down"></i></button>
                    <button onclick="deleteRecord(${idx})" class="p-1 hover:bg-rose-950 rounded text-rose-400 hover:text-rose-300 ml-1" title="Delete"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
            <div>
                <label class="block text-[#8a8780] text-[11px] mb-1">Title</label>
                <input type="text" value="${escapeHtml(rec.title)}" oninput="updateRecordField(${idx}, 'title', this.value)" class="w-full bg-[#0d0c0f] border border-[rgba(255,255,255,0.06)] rounded-lg p-2 text-white font-medium outline-none focus:border-[#c9a668]">
            </div>
            <div>
                <label class="block text-[#8a8780] text-[11px] mb-1">Question / Objective</label>
                <textarea rows="2" oninput="updateRecordField(${idx}, 'question', this.value)" class="w-full bg-[#0d0c0f] border border-[rgba(255,255,255,0.06)] rounded-lg p-2 text-slate-200 outline-none focus:border-[#c9a668]">${escapeHtml(rec.question)}</textarea>
            </div>
            <div>
                <div class="flex justify-between items-center mb-1">
                    <label class="text-[#8a8780] text-[11px]">${isPython ? 'Source Code:' : 'SQL Query:'}</label>
                    <label class="text-[#c9a668] hover:underline cursor-pointer text-[10px]">
                        Upload Code/Query SS
                        <input type="file" accept="image/*" class="hidden" onchange="handleImageUpload(event, ${idx}, 'codeImg')">
                    </label>
                </div>
                <textarea rows="3" oninput="updateRecordField(${idx}, 'code', this.value)" class="w-full bg-[#0d0c0f] border border-[rgba(255,255,255,0.06)] rounded-lg p-2 font-code text-slate-300 text-[11px] outline-none focus:border-[#c9a668]">${escapeHtml(rec.code)}</textarea>
                ${rec.codeImg ? `<div class="mt-1 flex items-center justify-between text-emerald-400 text-[10px]"><span class="flex items-center gap-1"><i class="fa-solid fa-image"></i> Code SS attached</span><button onclick="removeImg(${idx}, 'codeImg')" class="text-rose-400 underline">Remove</button></div>` : ''}
            </div>
            <div class="border-t border-[rgba(255,255,255,0.06)] pt-2.5">
                <div class="flex justify-between items-center mb-1">
                    <label class="text-[#8a8780] text-[11px]">Output / Result:</label>
                    <label class="text-[#c9a668] hover:underline cursor-pointer text-[10px]">
                        Upload Output SS
                        <input type="file" accept="image/*" class="hidden" onchange="handleImageUpload(event, ${idx}, 'outputImg')">
                    </label>
                </div>
                <textarea rows="2" oninput="updateRecordField(${idx}, 'output', this.value)" class="w-full bg-[#0d0c0f] border border-[rgba(255,255,255,0.06)] rounded-lg p-2 font-code text-slate-300 text-[11px] outline-none focus:border-[#c9a668]">${escapeHtml(rec.output)}</textarea>
                ${rec.outputImg ? `<div class="mt-1 flex items-center justify-between text-emerald-400 text-[10px]"><span class="flex items-center gap-1"><i class="fa-solid fa-chart-line"></i> Output SS attached</span><button onclick="removeImg(${idx}, 'outputImg')" class="text-rose-400 underline">Remove</button></div>` : ''}
            </div>
            <div class="pt-1">
                <div class="flex justify-between text-[10px] text-[#8a8780] mb-1">
                    <span>Image Scale / Width:</span>
                    <span class="font-mono text-[#c9a668]">${rec.imgWidthPct || 100}%</span>
                </div>
                <input type="range" min="30" max="100" step="5" value="${rec.imgWidthPct || 100}" oninput="updateRecordField(${idx}, 'imgWidthPct', parseInt(this.value))" class="w-full accent-[#c9a668]">
            </div>
        `;
        container.appendChild(card);
    });
}

function updateRecordField(index, key, val) {
    state.records[index][key] = val;
    saveToLocalStorage();
    renderDocumentPreview();
}

function handleImageUpload(e, index, imgKey) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        state.records[index][imgKey] = evt.target.result;
        saveToLocalStorage();
        renderEditorList();
        renderDocumentPreview();
    };
    reader.readAsDataURL(file);
}

function removeImg(index, imgKey) {
    state.records[index][imgKey] = "";
    saveToLocalStorage();
    renderEditorList();
    renderDocumentPreview();
}

function updateMetadata() {
    state.meta.name = document.getElementById('meta-name').value;
    state.meta.roll = document.getElementById('meta-roll').value;
    state.meta.className = document.getElementById('meta-class').value;
    state.meta.school = document.getElementById('meta-school').value;
    state.meta.teacher = document.getElementById('meta-teacher').value;
    state.meta.session = document.getElementById('meta-session').value;
    saveToLocalStorage();
    renderDocumentPreview();
}

function updateIntroPageSettings() {
    state.intro.showCover = document.getElementById('toggle-cover').checked;
    state.intro.showCert = document.getElementById('toggle-cert').checked;
    state.intro.showAck = document.getElementById('toggle-ack').checked;
    state.intro.showIndex = document.getElementById('toggle-index').checked;
    saveToLocalStorage();
    renderDocumentPreview();
}

function updateLayoutSettings() {
    state.layout.layoutMode = document.getElementById('setting-layout-mode').value;
    state.layout.fontSize = parseFloat(document.getElementById('setting-font-size').value);
    state.layout.codeSize = parseFloat(document.getElementById('setting-code-size').value);
    state.layout.imgHeight = parseInt(document.getElementById('setting-img-height').value);
    state.layout.showHeaders = document.getElementById('setting-show-headers').checked;
    document.getElementById('val-font-size').innerText = state.layout.fontSize + 'pt';
    document.getElementById('val-code-size').innerText = state.layout.codeSize + 'pt';
    document.getElementById('val-img-height').innerText = state.layout.imgHeight + 'px';
    saveToLocalStorage();
    renderDocumentPreview();
}

function saveToLocalStorage() {
    localStorage.setItem('cbse_cs_project_data', JSON.stringify(state));
}

function loadDefaultRecords() {
    const py = presetLibrary.filter(p => p.cat === 'python').slice(0, 15);
    const sql = presetLibrary.filter(p => p.cat === 'sql').slice(0, 10);
    state.records = [
        ...py.map((p, i) => ({ ...p, title: `Python Practical ${i + 1}: ${p.title}` })),
        ...sql.map((p, i) => ({ ...p, title: `SQL Practical ${i + 1}: ${p.title}` }))
    ].map(p => ({
        type: p.cat, title: p.title, question: p.q,
        code: p.code || "", codeImg: "",
        output: p.output || "", outputImg: "", imgWidthPct: 100
    }));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('cbse_cs_project_data');
    if (saved) {
        try {
            state = JSON.parse(saved);
            document.getElementById('meta-name').value = state.meta.name || '';
            document.getElementById('meta-roll').value = state.meta.roll || '';
            document.getElementById('meta-class').value = state.meta.className || '';
            document.getElementById('meta-school').value = state.meta.school || '';
            document.getElementById('meta-teacher').value = state.meta.teacher || '';
            document.getElementById('meta-session').value = state.meta.session || '';
            document.getElementById('setting-layout-mode').value = state.layout.layoutMode || 'tabwise';
            document.getElementById('setting-font-size').value = state.layout.fontSize || 10;
            document.getElementById('setting-code-size').value = state.layout.codeSize || 9;
            document.getElementById('setting-img-height').value = state.layout.imgHeight || 160;
            if (state.intro) {
                document.getElementById('toggle-cover').checked = state.intro.showCover !== false;
                document.getElementById('toggle-cert').checked = state.intro.showCert !== false;
                document.getElementById('toggle-ack').checked = state.intro.showAck !== false;
                document.getElementById('toggle-index').checked = state.intro.showIndex !== false;
            }
        } catch(e) {}
    } else {
        loadDefaultRecords();
    }
    highlightActiveStyles();
}

function exportProjectJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `CBSE_CS_Class12_Project_${state.meta.name.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

function importProjectJSON(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        try {
            const imported = JSON.parse(evt.target.result);
            if (imported && imported.records) {
                state = imported;
                saveToLocalStorage();
                location.reload();
            } else { alert('Invalid JSON format!'); }
        } catch(err) { alert('Error parsing uploaded JSON file.'); }
    };
    reader.readAsText(file);
}

function triggerPrint() { window.print(); }

function escapeHtml(str) {
    if(!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

const LOGO_SRC = '/assets/logo.png';
const LOGO_FALLBACKS = ['assets/logo.png', './assets/logo.png'];
const INTRO_SUBJECT = {
    name: 'COMPUTER SCIENCE', title: 'Computer Science', code: '083',
    tagline: 'A Practical Record File on Python Programming &amp; Database Management System (SQL)',
    verified: 'All Python programs and SQL queries contained in this file have been verified and found satisfactory.'
};
const SERIF = "'Times New Roman', Times, serif";

function logoFallback(img) {
    const i = parseInt(img.dataset.fb || '0', 10);
    if (i < LOGO_FALLBACKS.length) { img.dataset.fb = String(i + 1); img.src = LOGO_FALLBACKS[i]; }
    else { img.style.visibility = 'hidden'; }
}
window.logoFallback = logoFallback;

(function () { const pre = new Image(); pre.src = LOGO_SRC; })();

function waitForImages(timeout) {
    const imgs = Array.from(document.querySelectorAll('#a4-document-container img'));
    const jobs = imgs.map(img => img.complete && img.naturalWidth > 0 ? Promise.resolve() : new Promise(res => {
        img.addEventListener('load', () => res());
        img.addEventListener('error', () => { if (parseInt(img.dataset.fb || '0', 10) >= LOGO_FALLBACKS.length) res(); });
        if (img.complete && img.naturalWidth === 0 && parseInt(img.dataset.fb || '0', 10) >= LOGO_FALLBACKS.length) res();
    }));
    return Promise.race([Promise.all(jobs), new Promise(res => setTimeout(res, timeout || 4000))])
        .then(() => new Promise(res => requestAnimationFrame(() => setTimeout(res, 100))));
}

function logoBox(mm, extra) {
    return `<div style="width:${mm}mm;height:${mm}mm;flex:0 0 auto;display:flex;align-items:center;justify-content:center;${extra || ''}">
        <img src="${LOGO_SRC}" alt="School Logo" data-fb="0" onerror="logoFallback(this)"
             style="max-width:100%;max-height:100%;object-fit:contain;display:block;"></div>`;
}

function introFooter(label, pageNum) {
    return state.layout.showHeaders
        ? `<div class="page-footer" style="flex:0 0 auto;display:flex;justify-content:space-between;align-items:center;border-top:1px solid #9ca3af;padding:2.5mm 0 1mm;margin-top:6mm;min-height:9mm;box-sizing:border-box;font:500 9.5pt/1.4 'Inter',Arial,sans-serif;color:#374151;"><span>${label}</span><span>Page ${pageNum}</span></div>`
        : '';
}

function makeIntroPage(inner, footerHTML, extraClass) {
    const el = document.createElement('div');
    el.className = 'a4-page font-serif-doc ' + (extraClass || '');
    el.innerHTML = inner + (footerHTML || '');
    return el;
}

function buildCoverPage() {
    const m = state.meta, S = INTRO_SUBJECT, e = escapeHtml;
    const style = state.intro.coverStyle || 'classic';
    const sans = "font-family:'Inter',Arial,sans-serif;";
    let inner = '';

    if (style === 'modern') {
        inner = `
        <div style="flex:1;display:flex;flex-direction:column;border-left:10px solid #000;padding:2mm 0 0 10mm;min-height:0;">
            <div style="display:flex;align-items:center;gap:6mm;padding-bottom:6mm;border-bottom:1px solid #000;">
                ${logoBox(30)}
                <div>
                    <div style="font:800 17pt/1.2 ${SERIF};text-transform:uppercase;letter-spacing:.04em;">${e(m.school)}</div>
                    <div style="${sans}font-size:9pt;color:#4b5563;margin-top:1.5mm;letter-spacing:.05em;">Affiliated to Central Board of Secondary Education (CBSE)</div>
                </div>
            </div>
            <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">
                <span style="${sans}align-self:flex-start;font-size:9pt;font-weight:700;letter-spacing:.2em;text-transform:uppercase;background:#000;color:#fff;padding:2mm 4mm;">CBSE Class XII</span>
                <h1 style="font:800 32pt/1.1 ${SERIF};text-transform:uppercase;letter-spacing:.02em;margin:9mm 0 3mm;">${S.name}</h1>
                <p style="${sans}font-size:12pt;font-weight:600;color:#374151;">SUBJECT CODE ${S.code} &bull; PRACTICAL FILE</p>
                <p style="font:italic 11pt/1.5 ${SERIF};color:#4b5563;margin-top:6mm;max-width:130mm;">${S.tagline}</p>
                <div style="margin-top:14mm;">
                    <p style="${sans}font-size:8.5pt;text-transform:uppercase;letter-spacing:.2em;color:#6b7280;">Academic Session</p>
                    <p style="${sans}font-size:20pt;font-weight:700;margin-top:1mm;">${e(m.session)}</p>
                </div>
            </div>
            <div style="${sans}display:grid;grid-template-columns:1fr 1fr;gap:8mm;border-top:2px solid #000;padding:6mm 0 4mm;font-size:10.5pt;line-height:1.6;">
                <div>
                    <p style="font-size:8.5pt;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.1em;">Submitted By</p>
                    <p style="font-size:14pt;font-weight:700;margin:1mm 0;">${e(m.name)}</p>
                    <p>Roll No: ${e(m.roll)}</p><p>${e(m.className)}</p><p>${e(m.school)}</p>
                </div>
                <div style="text-align:right;">
                    <p style="font-size:8.5pt;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.1em;">Evaluated By</p>
                    <p style="font-size:14pt;font-weight:700;margin:1mm 0;">${e(m.teacher)}</p>
                    <p>Department of Computer Science &amp; AI</p>
                </div>
            </div>
        </div>`;
    } else if (style === 'formal') {
        inner = `
        <div style="flex:1;display:flex;flex-direction:column;justify-content:space-between;border:1.5px solid #000;padding:12mm 12mm 10mm;text-align:center;min-height:0;">
            <div>
                <div style="display:flex;justify-content:center;">${logoBox(42)}</div>
                <h3 style="font:700 17pt/1.25 ${SERIF};text-transform:uppercase;letter-spacing:.08em;margin-top:6mm;">${e(m.school)}</h3>
                <p style="${sans}font-size:9.5pt;color:#4b5563;margin-top:2mm;">Affiliated to Central Board of Secondary Education (CBSE)</p>
                <div style="width:40mm;border-top:2px solid #000;margin:7mm auto 0;"></div>
            </div>
            <div>
                <h1 style="font:700 30pt/1.2 ${SERIF};text-transform:uppercase;text-decoration:underline;letter-spacing:.06em;">Project Record File</h1>
                <p style="font:600 17pt/1.3 ${SERIF};margin-top:6mm;">${S.name} (CODE ${S.code})</p>
                <p style="font:italic 11pt/1.5 ${SERIF};color:#4b5563;margin:5mm auto 0;max-width:135mm;">${S.tagline}</p>
                <p style="${sans}font-size:11pt;margin-top:8mm;"><strong>Session:</strong> ${e(m.session)}</p>
            </div>
            <div style="${sans}display:grid;grid-template-columns:1fr 1fr;gap:6mm;text-align:left;font-size:11pt;line-height:1.9;border-top:1.5px solid #000;padding-top:6mm;">
                <div><p><strong>Name:</strong> ${e(m.name)}</p><p><strong>Roll No:</strong> ${e(m.roll)}</p><p><strong>Class:</strong> ${e(m.className)}</p></div>
                <div style="text-align:right;"><p><strong>Teacher In-Charge:</strong></p><p>${e(m.teacher)}</p><p>Department of Computer Science &amp; AI</p></div>
            </div>
        </div>`;
    } else {
        inner = `
        <div style="flex:1;display:flex;flex-direction:column;justify-content:space-between;border:5px double #000;padding:10mm 10mm 8mm;text-align:center;min-height:0;">
            <div>
                <div style="display:flex;justify-content:center;">${logoBox(40)}</div>
                <h2 style="font:700 18pt/1.25 ${SERIF};text-transform:uppercase;letter-spacing:.07em;margin-top:5mm;">${e(m.school)}</h2>
                <p style="${sans}font-size:9pt;text-transform:uppercase;letter-spacing:.14em;color:#4b5563;margin-top:2mm;">Central Board of Secondary Education &bull; Session ${e(m.session)}</p>
            </div>
            <div>
                <p style="${sans}font-size:10pt;letter-spacing:.3em;text-transform:uppercase;color:#6b7280;margin-bottom:5mm;">Practical Record File</p>
                <div style="border-top:3px solid #000;border-bottom:3px solid #000;padding:9mm 4mm;">
                    <h1 style="font:800 30pt/1.15 ${SERIF};letter-spacing:.05em;text-transform:uppercase;">${S.name}</h1>
                    <p style="${sans}font-size:11pt;font-weight:600;letter-spacing:.22em;margin-top:4mm;">SUBJECT CODE: ${S.code}</p>
                </div>
                <p style="font:italic 11.5pt/1.6 ${SERIF};color:#4b5563;margin:6mm auto 0;max-width:140mm;">${S.tagline}</p>
            </div>
            <div style="${sans}display:grid;grid-template-columns:1fr 1fr;gap:8mm;text-align:left;font-size:10.5pt;line-height:1.85;border-top:1.5px solid #000;padding-top:5mm;">
                <div>
                    <p style="font-size:9pt;font-weight:700;text-transform:uppercase;color:#6b7280;letter-spacing:.1em;">Submitted By</p>
                    <p><strong>Name:</strong> ${e(m.name)}</p><p><strong>Roll No:</strong> ${e(m.roll)}</p>
                    <p><strong>Class:</strong> ${e(m.className)}</p><p><strong>School:</strong> ${e(m.school)}</p>
                </div>
                <div style="text-align:right;">
                    <p style="font-size:9pt;font-weight:700;text-transform:uppercase;color:#6b7280;letter-spacing:.1em;">Submitted To</p>
                    <p><strong>Evaluator:</strong> ${e(m.teacher)}</p><p>Department of Computer Science &amp; AI</p>
                </div>
            </div>
        </div>`;
    }
    return makeIntroPage(inner, '');
}

function sigBlock(labels, borderColor) {
    return `<div style="display:grid;grid-template-columns:repeat(${labels.length},1fr);gap:12mm;text-align:center;font:600 9.5pt 'Inter',Arial,sans-serif;">
        ${labels.map(l => `<div><div style="height:16mm;"></div><div style="border-top:1.5px solid ${borderColor || '#000'};padding-top:2mm;">${l}</div></div>`).join('')}</div>`;
}

function remarksBlock() {
    const line = '<div style="border-bottom:1px solid #6b7280;height:9mm;"></div>';
    return `<div style="font:600 10.5pt 'Inter',Arial,sans-serif;"><div>Remarks:</div>${line}${line}</div>`;
}

function buildCertPage(pageNum) {
    const m = state.meta, S = INTRO_SUBJECT, e = escapeHtml;
    const cStyle = state.intro.certStyle || 'classic';
    const fs = (state.layout.fontSize || 10) + 3;
    const p = `font-size:${fs}pt;line-height:2.1;text-align:justify;`;
    const dets = remarksBlock();
    const dateLine = `<div style="display:flex;justify-content:space-between;font:600 10.5pt 'Inter',Arial,sans-serif;"><span>Date: ______________</span></div>`;
    let inner = '';

    if (cStyle === 'ornate') {
        inner = `
        <div style="flex:1;display:flex;flex-direction:column;border:5px double #000;padding:8mm 10mm;min-height:0;">
            <div style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;min-height:0;padding:3mm 0;">
                <div style="text-align:center;">
                    <h2 style="font:800 26pt/1.2 ${SERIF};text-transform:uppercase;letter-spacing:.12em;">Certificate</h2>
                    <div style="font:italic 13pt ${SERIF};color:#4b5563;margin-top:1mm;">of Excellence</div>
                    <div style="width:55mm;border-top:2px solid #000;margin:4mm auto 0;"></div>
                </div>
                <div>
                    <p style="${p}">This is to certify that <strong>${e(m.name)}</strong>, a student of <strong>${e(m.className)}</strong> bearing Roll No <strong>${e(m.roll)}</strong>, has successfully completed the practical project file of <strong>${S.title} (Code ${S.code})</strong> for the academic session <strong>${e(m.session)}</strong> with distinction.</p>
                    <p style="${p}margin-top:3mm;">${S.verified} The work was carried out with sincerity, dedication and discipline, and is hereby found to be of a very satisfactory standard.</p>
                    <p style="${p}margin-top:3mm;">The student has shown regular attendance and a thorough understanding of the subject during the practical sessions.</p>
                </div>
                ${dets}
                ${dateLine}
            </div>
            ${sigBlock(["Teacher's Signature", 'External Examiner'])}
        </div>`;
    } else if (cStyle === 'minimal') {
        inner = `
        <div style="flex:1;display:flex;flex-direction:column;min-height:0;">
            <div style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;min-height:0;padding:4mm 0;">
                <h2 style="font:700 22pt/1.2 ${SERIF};text-transform:uppercase;letter-spacing:.2em;text-align:center;">Certificate</h2>
                <div>
                    <p style="${p}">This is to certify that <strong>${e(m.name)}</strong> of <strong>${e(m.className)}</strong>, Roll No <strong>${e(m.roll)}</strong>, has successfully completed the ${S.title} (${S.code}) project file for the session <strong>${e(m.session)}</strong>.</p>
                    <p style="${p}margin-top:3mm;">${S.verified} The record is complete in all respects and is submitted for evaluation.</p>
                    <p style="${p}margin-top:3mm;">The student has shown regular attendance, sincerity and a good understanding of the subject during the practical sessions.</p>
                </div>
                ${dets}
                ${dateLine}
            </div>
            ${sigBlock(['Teacher', 'Examiner'], '#6b7280')}
        </div>`;
    } else {
        inner = `
        <div style="flex:1;display:flex;flex-direction:column;border:1.5px solid #000;padding:8mm 10mm;min-height:0;">
            <div style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;min-height:0;padding:3mm 0;">
                <h2 style="font:700 20pt/1.25 ${SERIF};text-align:center;text-transform:uppercase;text-decoration:underline;letter-spacing:.08em;">Certificate of Authenticity</h2>
                <div>
                    <p style="${p}">This is to certify that <strong>${e(m.name)}</strong>, a student of class <strong>${e(m.className)}</strong> bearing Roll Number <strong>${e(m.roll)}</strong>, has successfully completed the practical coursework and project file requirements for <strong>${S.title} (Subject Code ${S.code})</strong> as prescribed by the Central Board of Secondary Education (CBSE) for the academic session <strong>${e(m.session)}</strong>.</p>
                    <p style="${p}margin-top:3mm;">${S.verified} The work contained in this record file is authentic and original, and was executed by the student under supervision.</p>
                    <p style="${p}margin-top:3mm;">The student has shown regular attendance, sincerity and a good understanding of the subject during the practical sessions.</p>
                </div>
                ${dets}
                ${dateLine}
            </div>
            ${sigBlock(['Internal / Teacher Signature', 'External Examiner Signature'])}
        </div>`;
    }
    return makeIntroPage(inner, introFooter('Certificate', pageNum));
}

function buildAckPage(pageNum) {
    const m = state.meta, S = INTRO_SUBJECT, e = escapeHtml;
    const aStyle = state.intro.ackStyle || 'classic';
    const fs = (state.layout.fontSize || 10) + 3;
    const p = `font-size:${fs}pt;line-height:2.1;text-align:justify;`;
    const sign = `<div style="text-align:right;font:400 11pt/1.7 'Inter',Arial,sans-serif;">
        <div style="height:14mm;"></div>
        <p style="font-weight:700;font-size:12pt;">${e(m.name)}</p>
        <p>Roll No: ${e(m.roll)}</p></div>`;
    const dateLine = `<div style="font:600 10.5pt 'Inter',Arial,sans-serif;">Date: ______________</div>`;
    let inner = '';

    if (aStyle === 'formal') {
        inner = `
        <div style="flex:1;display:flex;flex-direction:column;border:1.5px solid #000;padding:8mm 10mm;min-height:0;">
            <div style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;min-height:0;padding:3mm 0;">
                <h2 style="font:700 20pt/1.25 ${SERIF};text-align:center;text-transform:uppercase;letter-spacing:.12em;">Acknowledgement</h2>
                <div>
                    <p style="${p}">I would like to express my sincere gratitude to my teacher <strong>${e(m.teacher)}</strong> and our respected Principal for their constant guidance, valuable feedback and support throughout the course of this project.</p>
                    <p style="${p}margin-top:3mm;">I am also thankful to the school management for providing the laboratory facilities and the learning environment needed to complete this practical file successfully.</p>
                    <p style="${p}margin-top:3mm;">I thank my parents and friends for their encouragement, patience and helpful suggestions during the compilation of this practical file. Their support kept me motivated until the very end.</p>
                    <p style="${p}margin-top:3mm;">Finally, I thank everyone who directly or indirectly helped me in completing this work.</p>
                </div>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:flex-end;">${dateLine}${sign}</div>
        </div>`;
    } else {
        inner = `
        <div style="flex:1;display:flex;flex-direction:column;min-height:0;">
            <div style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;min-height:0;padding:4mm 0;">
                <h2 style="font:700 20pt/1.25 ${SERIF};text-align:center;text-transform:uppercase;text-decoration:underline;letter-spacing:.1em;">Acknowledgement</h2>
                <div>
                    <p style="${p}">I wish to express my deep sense of gratitude to my ${S.title} teacher <strong>${e(m.teacher)}</strong> and our Principal for providing the necessary guidance, laboratory facilities, and encouragement throughout this practical project. Their timely advice helped me understand each concept clearly.</p>
                    <p style="${p}margin-top:3mm;">I am also thankful to the school management for giving me the opportunity and the resources to carry out this work in a well-equipped environment.</p>
                    <p style="${p}margin-top:3mm;">I am equally grateful to my parents and fellow classmates for their helpful suggestions and unwavering support while compiling these practical records.</p>
                    <p style="${p}margin-top:3mm;">Last but not least, I thank everyone who contributed, directly or indirectly, to the successful completion of this project file.</p>
                </div>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:flex-end;">${dateLine}${sign}</div>
        </div>`;
    }
    return makeIntroPage(inner, introFooter('Acknowledgement', pageNum));
}

function buildIndexPageEl(rows, pageNum) {
    const e = escapeHtml, n = rows.length;
    const cols = n > 36 ? 2 : 1;
    const perCol = Math.max(1, Math.ceil(n / cols));
    const rowH = Math.min(14, 226 / perCol);
    const fsz = cols === 2 ? (perCol > 44 ? 6.5 : perCol > 38 ? 7 : 7.5)
              : n <= 22 ? 10.5 : n <= 28 ? 9.5 : 8.5;
    const padV = cols === 2 ? 0.6 : n <= 22 ? 2 : 1;
    const bd = '1px solid #9ca3af';
    const cell = `padding:${padV}mm 2mm;border-right:${bd};border-bottom:${bd};vertical-align:middle;overflow:hidden;`;
    const th = 'padding:2mm;border-right:1px solid #000;';

    const table = (list, start) => {
        const body = [];
        for (let i = 0; i < perCol; i++) {
            const r = list[i];
            body.push(r
                ? `<tr><td style="${cell}text-align:center;font-weight:700;">${r.n}</td><td style="${cell}font-weight:500;">${e(r.title)}</td>${cols === 1 ? `<td style="${cell}text-align:center;text-transform:uppercase;font-size:${Math.max(fsz - 1.5, 6)}pt;">${e(r.type || '')}</td>` : ''}<td style="${cell}border-right:none;text-align:center;font-weight:700;">${r.page}</td></tr>`
                : `<tr><td style="${cell}">&nbsp;</td><td style="${cell}">&nbsp;</td>${cols === 1 ? `<td style="${cell}">&nbsp;</td>` : ''}<td style="${cell}border-right:none;">&nbsp;</td></tr>`);
        }
        const widths = cols === 1 ? '<col style="width:14mm"><col><col style="width:28mm"><col style="width:22mm">'
                                  : '<col style="width:9mm"><col><col style="width:12mm">';
        return `<table style="width:100%;border-collapse:collapse;table-layout:fixed;border:1.5px solid #000;color:#000;font-size:${fsz}pt;line-height:1.2;">
            <colgroup>${widths}</colgroup>
            <thead><tr style="background:#e5e7eb;font-size:${Math.min(fsz, 9)}pt;text-transform:uppercase;border-bottom:1.5px solid #000;height:9mm;">
                <th style="${th}">S.No</th><th style="${th}text-align:left;">Practical / Task Description</th>${cols === 1 ? `<th style="${th}">Tool</th>` : ''}<th style="padding:2mm;">Page</th></tr></thead>
            <tbody>${body.join('').replace(/<tr>/g, `<tr style="height:${rowH.toFixed(2)}mm;">`)}</tbody></table>`;
    };

    const tables = [];
    for (let c = 0; c < cols; c++) tables.push(`<div style="flex:1;min-width:0;">${table(rows.slice(c * perCol, (c + 1) * perCol))}</div>`);

    const el = document.createElement('div');
    el.className = 'a4-page rec-page font-sans';
    el.style.fontFamily = "'Inter', Arial, sans-serif";
    el.innerHTML = `
        <div class="page-body" style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;">
            <h2 style="font:700 20pt/1.2 ${SERIF};text-align:center;text-decoration:underline;text-transform:uppercase;letter-spacing:.12em;margin:2mm 0 8mm;">Practical Index Sheet</h2>
            <div style="flex:1;min-height:0;display:flex;gap:5mm;align-items:flex-start;">${tables.join('')}</div>
        </div>
        ${introFooter('Index', pageNum)}`;
    return el;
}

function renderDocumentPreview() {
    const container = document.getElementById('a4-document-container');
    container.innerHTML = '';
    let currentPageNum = 1;

    let recordStartPages = [];
    let tempPageCounter = 1;
    if (state.intro.showCover) tempPageCounter++;
    if (state.intro.showCert) tempPageCounter++;
    if (state.intro.showAck) tempPageCounter++;
    if (state.intro.showIndex) tempPageCounter++;
    const layoutMode = state.layout.layoutMode || 'tabwise';
    const density = layoutMode === 'tabwise' ? 1 : (layoutMode === 'density1' ? 1 : layoutMode === 'density2' ? 2 : 3);

    if (layoutMode === 'tabwise') {
        state.records.forEach(() => { recordStartPages.push(tempPageCounter); tempPageCounter++; });
    } else {
        const tempRecords = [...state.records];
        while (tempRecords.length > 0) {
            const chunk = tempRecords.splice(0, density);
            chunk.forEach(() => { recordStartPages.push(tempPageCounter); });
            tempPageCounter++;
        }
    }

    if (state.intro.showCover) { container.appendChild(buildCoverPage()); currentPageNum++; }
    if (state.intro.showCert) { container.appendChild(buildCertPage(currentPageNum)); currentPageNum++; }
    if (state.intro.showAck) { container.appendChild(buildAckPage(currentPageNum)); currentPageNum++; }
    if (state.intro.showIndex) {
        const idxRows = state.records.map((rec, idx) => ({ n: idx + 1, title: rec.title, type: rec.type, page: recordStartPages[idx] || (currentPageNum + 1) }));
        container.appendChild(buildIndexPageEl(idxRows, currentPageNum));
        currentPageNum++;
    }

    if (layoutMode === 'tabwise') {
        const maxPageHeightPx = 297 * 3.7795;
        const usableHeightPx = maxPageHeightPx - (12 + 15) * 3.7795 - 30;
        let currentPageBlocks = [];
        let currentPageHeight = 0;

        const flushPage = () => {
            if (currentPageBlocks.length === 0) return;
            const pageEl = document.createElement('div');
            pageEl.className = "a4-page font-sans";
            pageEl.style.fontSize = `${state.layout.fontSize}pt`;
            pageEl.innerHTML = `
                <div class="space-y-2 flex-1">${currentPageBlocks.join('')}</div>
                ${state.layout.showHeaders ? `<div class="text-[8pt] text-gray-500 border-t border-gray-300 pt-1.5 flex justify-between"><span>Subject Code 083 • CS Project File</span><span>Page ${currentPageNum}</span></div>` : ''}
            `;
            container.appendChild(pageEl);
            currentPageNum++;
            currentPageBlocks = [];
            currentPageHeight = 0;
        };

        state.records.forEach((rec, recIdx) => {
            const isPython = rec.type === 'python';
            const imgScale = (rec.imgWidthPct || 100) / 100;

            let sec1 = `
                <div class="record-block border border-black rounded p-2.5 bg-white space-y-2 text-justify" data-recidx="${recIdx}">
                    <div class="bg-gray-100 p-1.5 border-b border-black font-bold flex justify-between items-center text-[10pt]">
                        <span>${escapeHtml(rec.title)}</span>
                        <span class="uppercase text-[8pt] px-1.5 py-0.5 border border-gray-400 bg-white font-mono">${rec.type}</span>
                    </div>
                    <div>
                        <strong class="text-[9pt] text-gray-900">${isPython ? 'Question / Problem Statement:' : 'Task Objective:'}</strong>
                        <p class="text-[9pt] text-gray-800 mt-0.5">${escapeHtml(rec.question)}</p>
                    </div>
                </div>`;

            let sec2 = `
                <div class="record-block border border-black rounded p-2.5 bg-white space-y-2 text-justify" data-recidx="${recIdx}">
                    <div class="text-[9pt] font-bold text-gray-900 border-b border-gray-300 pb-1">
                        ${escapeHtml(rec.title)} — <span class="text-[8pt] font-normal">${isPython ? 'Source Code' : 'SQL Query'}</span>
                    </div>
                    ${rec.code ? `<div class="doc-box font-code mt-1" style="font-size: ${state.layout.codeSize}pt">${escapeHtml(rec.code)}</div>` : ''}
                    ${rec.codeImg ? `<div class="img-preview-box my-1" style="max-height: ${state.layout.imgHeight}px"><img src="${rec.codeImg}" style="max-height: ${state.layout.imgHeight}px; width: ${imgScale * 100}%" alt="Code SS"></div>` : ''}
                </div>`;

            let sec3 = `
                <div class="record-block border border-black rounded p-2.5 bg-white space-y-2 text-justify" data-recidx="${recIdx}">
                    <div class="text-[9pt] font-bold text-gray-900 border-b border-gray-300 pb-1">
                        ${escapeHtml(rec.title)} — <span class="text-[8pt] font-normal">Output / Result</span>
                    </div>
                    ${rec.output ? `<div class="doc-box font-code mt-1" style="font-size: ${state.layout.codeSize}pt">${escapeHtml(rec.output)}</div>` : ''}
                    ${rec.outputImg ? `<div class="img-preview-box my-1" style="max-height: ${state.layout.imgHeight}px"><img src="${rec.outputImg}" style="max-height: ${state.layout.imgHeight}px; width: ${imgScale * 100}%" alt="Output SS"></div>` : ''}
                </div>`;

            const estHeight = (html) => {
                const textLen = (html.match(/[\w\s]/g) || []).length;
                const imgCount = (html.match(/<img /g) || []).length;
                const base = 60;
                const textPart = Math.min(400, textLen * 0.5);
                const imgPart = imgCount * (state.layout.imgHeight + 20);
                return base + textPart + imgPart;
            };

            const sections = [sec1, sec2, sec3];
            sections.forEach((secHtml) => {
                const h = estHeight(secHtml);
                if (currentPageHeight + h > usableHeightPx && currentPageBlocks.length > 0) {
                    flushPage();
                }
                currentPageBlocks.push(secHtml);
                currentPageHeight += h;
            });
        });
        flushPage();

    } else {
        const recordsCopy = [...state.records];
        while (recordsCopy.length > 0) {
            const chunk = recordsCopy.splice(0, density);
            const pageEl = document.createElement('div');
            pageEl.className = "a4-page font-sans";
            pageEl.style.fontSize = `${state.layout.fontSize}pt`;
            let chunkHTML = `<div class="space-y-3 flex-1">`;
            chunk.forEach((rec) => {
                const isPython = rec.type === 'python';
                const imgScale = (rec.imgWidthPct || 100) / 100;
                chunkHTML += `
                    <div class="record-block border border-black rounded p-2.5 bg-white space-y-2 text-justify">
                        <div class="bg-gray-100 p-1.5 border-b border-black font-bold flex justify-between items-center text-[10pt]">
                            <span>${escapeHtml(rec.title)}</span>
                            <span class="uppercase text-[8pt] px-1.5 py-0.5 border border-gray-400 bg-white font-mono">${rec.type}</span>
                        </div>
                        <div>
                            <strong class="text-[9pt] text-gray-900">${isPython ? 'Question / Problem Statement:' : 'Task Objective:'}</strong>
                            <p class="text-[9pt] text-gray-800 mt-0.5">${escapeHtml(rec.question)}</p>
                        </div>
                        <div>
                            <strong class="text-[9pt] text-gray-900">${isPython ? 'Source Code:' : 'SQL Query:'}</strong>
                            ${rec.code ? `<div class="doc-box font-code mt-1" style="font-size: ${state.layout.codeSize}pt">${escapeHtml(rec.code)}</div>` : ''}
                            ${rec.codeImg ? `<div class="img-preview-box my-1" style="max-height: ${state.layout.imgHeight}px"><img src="${rec.codeImg}" style="max-height: ${state.layout.imgHeight}px; width: ${imgScale * 100}%" alt="Code SS"></div>` : ''}
                        </div>
                        <div>
                            <strong class="text-[9pt] text-gray-900">Output / Result:</strong>
                            ${rec.output ? `<div class="doc-box font-code mt-1" style="font-size: ${state.layout.codeSize}pt">${escapeHtml(rec.output)}</div>` : ''}
                            ${rec.outputImg ? `<div class="img-preview-box my-1" style="max-height: ${state.layout.imgHeight}px"><img src="${rec.outputImg}" style="max-height: ${state.layout.imgHeight}px; width: ${imgScale * 100}%" alt="Output SS"></div>` : ''}
                        </div>
                    </div>
                `;
            });
            chunkHTML += `</div>`;
            pageEl.innerHTML = `
                ${chunkHTML}
                ${state.layout.showHeaders ? `<div class="text-[8pt] text-gray-500 border-t border-gray-300 pt-1.5 flex justify-between"><span>Subject Code 083 • CS Project File</span><span>Page ${currentPageNum}</span></div>` : ''}
            `;
            container.appendChild(pageEl);
            currentPageNum++;
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const missing = [];
    if (typeof state === 'undefined') missing.push('state');
    if (typeof window.renderDocumentPreview !== 'function') missing.push('renderDocumentPreview');
    if (!document.getElementById('a4-document-container')) missing.push('#a4-document-container');
    if (!document.querySelector('.preview-viewport')) missing.push('.preview-viewport');
    if (missing.length) { console.warn('Patch not active. Missing from this page: ' + missing.join(', ') + ' | page title: ' + document.title + ' | scripts: ' + document.scripts.length); return; }
    const MM = 96 / 25.4;
    const origRender = window.renderDocumentPreview;
    const natMap = new Map();
    const imgPromises = new Map();
    let token = 0, timer = null;

    function loadImg(src) {
        if (!imgPromises.has(src)) {
            imgPromises.set(src, new Promise(res => {
                const i = new Image();
                i.onload = () => { natMap.set(src, { w: i.naturalWidth, h: i.naturalHeight }); res(); };
                i.onerror = () => res();
                i.src = src;
            }));
        }
        return imgPromises.get(src);
    }

    async function run() {
        const my = ++token;
        const L = state.layout, esc = window.escapeHtml;
        try { await document.fonts.ready; } catch (e) {}
        const srcs = [];
        state.records.forEach(r => ['codeImg', 'dataImg', 'outputImg'].forEach(k => r[k] && srcs.push(r[k])));
        await Promise.all(srcs.map(loadImg));
        if (my !== token) return;

        const host = document.createElement('div');
        host.style.cssText = 'position:absolute;left:-10000px;top:0;visibility:hidden;width:210mm';
        host.innerHTML = `<div class="a4-page rec-page" style="margin:0"><div class="page-body"></div>${L.showHeaders ? '<div class="page-footer"><span>x</span><span>x</span></div>' : ''}</div>`;
        document.body.appendChild(host);
        const probe = host.querySelector('.page-body');
        const bodyW = probe.clientWidth, bodyH = probe.clientHeight - 8;

        const fs = L.fontSize, cs = L.codeSize;
        const capH = Math.max(60, Math.min(L.imgHeight, bodyH - 70));
        const innerW = bodyW - 22;

        function blockHTML(b) {
            const rec = state.records[b.rec], py = rec.type === 'python';
            if (b.kind === 'head') {
                return `<div class="blk"><div class="blk-title" style="font-size:${fs}pt"><span>${esc(rec.title)}</span><span class="blk-tag">${rec.type}</span></div>
                    <div class="blk-sec"><span class="blk-lbl" style="font-size:${fs - 1}pt">${py ? 'Question / Problem Statement:' : 'Task Objective:'}</span><p class="blk-txt" style="font-size:${fs - 1}pt">${esc(rec.question)}</p></div></div>`;
            }
            const lbl = `<span class="blk-lbl" style="font-size:${fs - 1}pt">${b.label}${b.contd ? ' (contd.)' : ''}</span>`;
            if (b.kind === 'text') {
                return `<div class="blk"><div class="blk-sec">${lbl}<div class="doc-box font-code" style="font-size:${cs}pt">${esc(b.text)}</div></div></div>`;
            }
            return `<div class="blk"><div class="blk-sec">${lbl}<div class="img-preview-box" style="height:${b.dh + 2}px"><img src="${b.src}" style="width:${b.dw}px;height:${b.dh}px" alt=""></div></div></div>`;
        }

        function imgBlock(ri, src, label, pct) {
            const n = natMap.get(src) || { w: 4, h: 3 };
            let dw = innerW * ((pct || 100) / 100), dh = dw * n.h / n.w;
            if (dh > capH) { dh = capH; dw = dh * n.w / n.h; }
            return { kind: 'img', rec: ri, label, src, dw: Math.round(dw), dh: Math.round(dh) };
        }

        const list = [];
        state.records.forEach((rec, ri) => {
            const py = rec.type === 'python';
            list.push({ kind: 'head', rec: ri, keepNext: true });
            if (rec.code) list.push({ kind: 'text', rec: ri, label: py ? 'Source Code:' : 'SQL Query:', text: rec.code });
            if (rec.codeImg) list.push(imgBlock(ri, rec.codeImg, py ? 'Code Screenshot:' : 'Query Screenshot:', rec.imgWidthPct));
            if (!py && rec.dataImg) list.push(imgBlock(ri, rec.dataImg, 'Data Table Screenshot:', rec.imgWidthPct));
            if (rec.output) list.push({ kind: 'text', rec: ri, label: 'Output / Result:', text: rec.output });
            if (rec.outputImg) list.push(imgBlock(ri, rec.outputImg, 'Output Screenshot:', rec.imgWidthPct));
        });

        const meas = b => {
            const t = document.createElement('div');
            t.innerHTML = blockHTML(b);
            probe.appendChild(t);
            const h = t.getBoundingClientRect().height;
            t.remove();
            return h;
        };

        const pages = [[]], recPage = {};
        let used = 0;
        for (let i = 0; i < list.length;) {
            const b = list[i], page = pages[pages.length - 1];
            if (L.density === 1 && b.kind === 'head' && page.length) { pages.push([]); used = 0; continue; }
            const prev = page.length ? page[page.length - 1].b : null;
            const gap = prev ? (prev.rec === b.rec ? -1 : 10) : 0;
            const h = meas(b);
            let need = h + gap;
            const nx = list[i + 1];
            if (b.keepNext && nx && nx.rec === b.rec) need += Math.min(meas(nx), 70);

            if (used + need <= bodyH) {
                page.push({ b, gap, html: blockHTML(b) });
                used += h + gap;
                if (recPage[b.rec] === undefined) recPage[b.rec] = pages.length - 1;
                i++;
            } else if (page.length) {
                pages.push([]); used = 0;
            } else if (b.kind === 'text' && b.text.split('\n').length > 1) {
                const lines = b.text.split('\n');
                let lo = 1, hi = lines.length - 1, best = 1;
                while (lo <= hi) {
                    const m = (lo + hi) >> 1;
                    if (meas({ ...b, text: lines.slice(0, m).join('\n') }) <= bodyH) { best = m; lo = m + 1; } else hi = m - 1;
                }
                list.splice(i, 1, { ...b, text: lines.slice(0, best).join('\n') }, { ...b, text: lines.slice(best).join('\n'), contd: true });
            } else {
                page.push({ b, gap, html: blockHTML(b) });
                used += h;
                if (recPage[b.rec] === undefined) recPage[b.rec] = pages.length - 1;
                i++;
            }
        }
        host.remove();
        if (my !== token) return;

        const container = document.getElementById('a4-document-container');
        const vp = document.querySelector('.preview-viewport'), st = vp.scrollTop;
        const savedRecs = state.records, savedIdx = state.intro.showIndex;
        state.records = []; state.intro.showIndex = false;
        try { origRender(); } finally { state.records = savedRecs; state.intro.showIndex = savedIdx; }

        const I = state.intro;
        const introCount = (I.showCover ? 1 : 0) + (I.showCert ? 1 : 0) + (I.showAck ? 1 : 0);
        const idxPages = I.showIndex ? 1 : 0;
        const startNum = introCount + idxPages + 1;
        const foot = (l, n) => L.showHeaders ? `<div class="page-footer"><span>${l}</span><span>Page ${n}</span></div>` : '';

        const domPage = {};
        const buildIndex = () => { const firstRec = container.querySelector('.rec-page[data-rec]');
            const rows = state.records.map((rec, i) => ({ n: i + 1, title: rec.title, type: rec.type, page: startNum + (domPage[i] || 0) }));
            container.insertBefore(buildIndexPageEl(rows, introCount + 1), firstRec || null);
        };

        pages.filter(pg => pg.length).forEach((pg, pi) => {
            const el = document.createElement('div');
            el.className = 'a4-page rec-page'; el.dataset.rec = '1';
            el.innerHTML = `<div class="page-body">${pg.map((it, k) => `<div data-r="${it.b.rec}" style="margin-top:${k ? it.gap : 0}px">${it.html}</div>`).join('')}</div>${foot('Subject Code 083 • CS Project File', startNum + pi)}`;
            container.appendChild(el);
        });

        const recEls = () => [...container.querySelectorAll('.rec-page[data-rec]')];
        for (let guard = 0; guard < 500; guard++) {
            const els = recEls();
            const bad = els.findIndex(e => { const b = e.querySelector('.page-body'); return b.children.length > 1 && b.scrollHeight > b.clientHeight + 1; });
            if (bad < 0) break;
            const body = els[bad].querySelector('.page-body');
            let next = els[bad + 1];
            if (!next) {
                next = document.createElement('div');
                next.className = 'a4-page rec-page'; next.dataset.rec = '1';
                next.innerHTML = `<div class="page-body"></div>${foot('Subject Code 083 • CS Project File', 0)}`;
                els[bad].after(next);
            }
            const mv = body.lastElementChild;
            mv.style.marginTop = '0px';
            const nb = next.querySelector('.page-body');
            if (nb.firstElementChild) nb.firstElementChild.style.marginTop = (nb.firstElementChild.dataset.r === mv.dataset.r ? -1 : 10) + 'px';
            nb.prepend(mv);
        }
        recEls().forEach((e, pi) => {
            const f = e.querySelector('.page-footer span:last-child');
            if (f) f.textContent = 'Page ' + (startNum + pi);
            e.querySelectorAll('[data-r]').forEach(c => { if (domPage[c.dataset.r] === undefined) domPage[c.dataset.r] = pi; });
        });
        if (I.showIndex) buildIndex();

        fitZoom();
        vp.scrollTop = st;
    }

    function fitZoom() {
        const vp = document.querySelector('.preview-viewport'), c = document.getElementById('a4-document-container');
        const z = Math.min(1, (vp.clientWidth - 32) / (210 * MM));
        c.style.zoom = z < 1 ? z : '';
    }

    window.renderDocumentPreview = function () { clearTimeout(timer); timer = setTimeout(run, 120); };
    window.triggerPrint = function () { clearTimeout(timer); run().then(() => waitForImages()).then(() => window.print()); };
    window.addEventListener('resize', fitZoom);

    const prevOnload = window.onload;
    window.onload = function () {
        if (prevOnload) prevOnload();
        if (state.layout.density > 2) state.layout.density = 2;
        const sel = document.getElementById('setting-density');
        if (sel) {
            sel.innerHTML = '<option value="2">Continuous flow: fill every page, nothing cut (saves paper)</option><option value="1">Each practical starts on a new page</option>';
            sel.value = String(state.layout.density === 1 ? 1 : 2);
        }
        renderDocumentPreview();
    };
});