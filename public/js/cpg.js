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
{ id: 1, cat: "python", title: "Count Digits in Space.txt", q: "Write a user-defined function CountDigits() that reads the text file 'Space.txt' and counts and returns the number of digits present in it.", code: "def CountDigits():\n    count = 0\n    with open('Space.txt', 'r') as f:\n        for line in f:\n            for ch in line:\n                if ch.isdigit():\n                    count += 1\n    return count\n\nprint('Total digits:', CountDigits())", output: "Total digits: 12" },

{ id: 2, cat: "python", title: "Words with Two or More 'e'", q: "Write a function ShowDoubleE() that reads 'Space.txt' and displays all words in which the lowercase letter 'e' appears at least twice.", code: "def ShowDoubleE():\n    with open('Space.txt', 'r') as f:\n        for word in f.read().split():\n            if word.count('e') >= 2:\n                print(word)\n\nShowDoubleE()", output: "experience\nenvironment\nexcellence" },

{ id: 3, cat: "python", title: "Display Lines with Four-Digit Year", q: "A text file 'History.txt' contains English text. Write a function DisplayYearLines() that displays all lines containing any four-digit number (e.g. 1947, 2024).", code: "def DisplayYearLines():\n    with open('History.txt', 'r') as f:\n        for line in f:\n            for w in line.split():\n                if w.isdigit() and len(w) == 4:\n                    print(line.strip())\n                    break\n\nDisplayYearLines()", output: "India got independence in 1947.\nThe Constitution was adopted in 1949." },

{ id: 4, cat: "python", title: "Words Containing Both 'a' and 'e'", q: "Write a function WordsAE() that reads 'Story.txt' and displays every word containing both the letters 'a' and 'e'.", code: "def WordsAE():\n    with open('Story.txt', 'r') as f:\n        for word in f.read().split():\n            if 'a' in word and 'e' in word:\n                print(word, end=' ')\n\nWordsAE()", output: "apple gate sample teacher" },

{ id: 5, cat: "python", title: "Display Lines Starting with a Vowel", q: "Write a function VowelLines() that displays all lines of 'Poem.txt' that begin with a vowel, and prints the total count of such lines.", code: "def VowelLines():\n    vowels = 'aeiouAEIOU'\n    count = 0\n    with open('Poem.txt', 'r') as f:\n        for line in f:\n            if line.strip() and line[0] in vowels:\n                print(line.strip())\n                count += 1\n    print('Total lines:', count)\n\nVowelLines()", output: "A quick brown fox\nAn apple a day\nTotal lines: 2" },

{ id: 6, cat: "python", title: "Copy Lines Containing 'India'", q: "Write a function CopyIndiaLines() that copies every line containing the word 'India' from 'Source.txt' into 'Target.txt'.", code: "def CopyIndiaLines():\n    with open('Source.txt', 'r') as src, open('Target.txt', 'w') as dst:\n        for line in src:\n            if 'India' in line:\n                dst.write(line)\n    print('Copied.')\n\nCopyIndiaLines()", output: "Copied." },

{ id: 7, cat: "python", title: "Remove All Vowels from a File", q: "Write a function RemoveVowels() that reads 'Input.txt', removes all vowels (a, e, i, o, u – both cases) and writes the result to 'Output.txt'.", code: "def RemoveVowels():\n    vowels = 'aeiouAEIOU'\n    with open('Input.txt', 'r') as src:\n        data = src.read()\n    result = ''.join(ch for ch in data if ch not in vowels)\n    with open('Output.txt', 'w') as dst:\n        dst.write(result)\n    print('Vowels removed.')\n\nRemoveVowels()", output: "Vowels removed." },

{ id: 8, cat: "python", title: "Word with Maximum Vowels", q: "Write a function MostVowels() that reads 'Story.txt' and displays the word that contains the maximum number of vowels.", code: "def MostVowels():\n    vowels = 'aeiouAEIOU'\n    with open('Story.txt', 'r') as f:\n        words = f.read().split()\n    best = max(words, key=lambda w: sum(1 for ch in w if ch in vowels))\n    print('Word:', best)\n\nMostVowels()", output: "Word: education" },

{ id: 9, cat: "python", title: "CSV — Append Record and Show Above 75", q: "Create 'students.csv' with columns Roll, Name, Marks. Write Accept() to append a new record and ShowAbove75() to display all records with marks > 75.", code: "import csv\n\ndef Accept():\n    with open('students.csv', 'a', newline='') as f:\n        w = csv.writer(f)\n        roll = int(input('Roll: '))\n        name = input('Name: '))\n        marks = float(input('Marks: '))\n        w.writerow([roll, name, marks])\n\ndef ShowAbove75():\n    with open('students.csv', 'r') as f:\n        for row in csv.reader(f):\n            if float(row[2]) > 75:\n                print(row)\n\nAccept()\nShowAbove75()", output: "[2, 'Priya', 92.0]\n[3, 'Rahul', 84.0]" },

{ id: 10, cat: "python", title: "CSV — Append Record and Count Total Records", q: "Write a program to append one record to 'sales.csv' (fields: PID, PName, Qty, Price) and then count the total number of records in the file.", code: "import csv\n\ndef AppendAndCount():\n    with open('sales.csv', 'a', newline='') as f:\n        csv.writer(f).writerow(['P004', 'Pencil', 100, 5])\n    count = 0\n    with open('sales.csv', 'r') as f:\n        for _ in csv.reader(f):\n            count += 1\n    print('Total records:', count)\n\nAppendAndCount()", output: "Total records: 4" },

{ id: 11, cat: "python", title: "CSV — Compute Total Sales (Qty × Price)", q: "Write TotalSales() that reads 'sales.csv' and returns the sum of Qty × Price over all records.", code: "import csv\n\ndef TotalSales():\n    total = 0\n    with open('sales.csv', 'r') as f:\n        for row in csv.reader(f):\n            total += int(row[2]) * float(row[3])\n    print('Total Sales:', total)\n\nTotalSales()", output: "Total Sales: 15200.0" },

{ id: 12, cat: "python", title: "CSV — Display Names Starting with 'S'", q: "Write a function ShowS() that reads 'students.csv' and displays the names beginning with the letter 'S'.", code: "import csv\n\ndef ShowS():\n    with open('students.csv', 'r') as f:\n        for row in csv.reader(f):\n            if row[1].startswith('S'):\n                print(row[1])\n\nShowS()", output: "Sanya\nShreya" },

{ id: 13, cat: "python", title: "CSV — Update Marks by Roll Number", q: "Write a function UpdateMarks(roll, new_marks) that reads 'students.csv', updates the marks of the given roll number, and rewrites the file.", code: "import csv\n\ndef UpdateMarks(roll, new_marks):\n    rows = []\n    with open('students.csv', 'r') as f:\n        rows = list(csv.reader(f))\n    for r in rows:\n        if r[0] == str(roll):\n            r[2] = str(new_marks)\n    with open('students.csv', 'w', newline='') as f:\n        csv.writer(f).writerows(rows)\n    print('Updated.')\n\nUpdateMarks(3, 95)", output: "Updated." },

{ id: 14, cat: "python", title: "Binary — Append Employee Record", q: "A binary file 'emp.dat' stores records of the form [EmpID, Name, Dept, Salary]. Write Append() to add one new employee record.", code: "import pickle\n\ndef Append():\n    with open('emp.dat', 'ab') as f:\n        eid = int(input('ID: '))\n        name = input('Name: ')\n        dept = input('Dept: ')\n        sal = float(input('Salary: '))\n        pickle.dump([eid, name, dept, sal], f)\n    print('Record appended.')\n\nAppend()", output: "Record appended." },

{ id: 15, cat: "python", title: "Binary — Update Salary of IT Dept", q: "Write UpdateIT() that opens 'emp.dat' (pickle records [ID, Name, Dept, Salary]) and changes the salary of every employee of the 'IT' department to 200000.", code: "import pickle\n\ndef UpdateIT():\n    records = []\n    with open('emp.dat', 'rb') as f:\n        try:\n            while True:\n                r = pickle.load(f)\n                if r[2] == 'IT':\n                    r[3] = 200000\n                records.append(r)\n        except EOFError:\n            pass\n    with open('emp.dat', 'wb') as f:\n        for r in records:\n            pickle.dump(r, f)\n    print('Updated IT salaries.')\n\nUpdateIT()", output: "Updated IT salaries." },

{ id: 16, cat: "python", title: "Binary — Search Employee by ID", q: "Write Search(eid) that reads 'emp.dat' and displays the record whose EmpID equals eid, or prints 'Not found'.", code: "import pickle\n\ndef Search(eid):\n    with open('emp.dat', 'rb') as f:\n        try:\n            while True:\n                r = pickle.load(f)\n                if r[0] == eid:\n                    print(r)\n                    return\n        except EOFError:\n            pass\n    print('Not found.')\n\nSearch(102)", output: "[102, 'Priya', 'HR', 75000.0]" },

{ id: 17, cat: "python", title: "Binary — Delete Employee Record", q: "Write Delete(eid) that deletes the record with EmpID = eid from 'emp.dat' by rewriting all other records.", code: "import pickle\n\ndef Delete(eid):\n    records = []\n    with open('emp.dat', 'rb') as f:\n        try:\n            while True:\n                r = pickle.load(f)\n                if r[0] != eid:\n                    records.append(r)\n        except EOFError:\n            pass\n    with open('emp.dat', 'wb') as f:\n        for r in records:\n            pickle.dump(r, f)\n    print('Deleted.')\n\nDelete(102)", output: "Deleted." },

{ id: 18, cat: "python", title: "Binary — Display Employees Earning > 80,000", q: "Write HighSalary() that reads 'emp.dat' and displays all records whose salary is greater than 80,000.", code: "import pickle\n\ndef HighSalary():\n    with open('emp.dat', 'rb') as f:\n        try:\n            while True:\n                r = pickle.load(f)\n                if r[3] > 80000:\n                    print(r)\n        except EOFError:\n            pass\n\nHighSalary()", output: "[101, 'Amit', 'IT', 120000.0]" },

{ id: 19, cat: "python", title: "Stack — Push Books > ₹250, Pop and Display", q: "List B contains (BookName, Price) tuples. Write Push_element() to push every book with price > 250 onto stack Books, Pop_element() to pop and display all elements, and Display() to show remaining stack.", code: "B = [('Machine Learning', 550), ('World Geography', 450),\n     ('Wonder World', 140), ('AI Revolution', 750)]\nBooks = []\n\ndef Push_element():\n    for b in B:\n        if b[1] > 250:\n            Books.append(b)\n\ndef Pop_element():\n    while Books:\n        print(Books.pop())\n    print('Stack empty')\n\ndef Display():\n    for b in Books[::-1]:\n        print(b)\n\nPush_element()\nprint('Stack:', Books)\nPop_element()", output: "Stack: [('Machine Learning', 550), ('World Geography', 450), ('AI Revolution', 750)]\n('AI Revolution', 750)\n('World Geography', 450)\n('Machine Learning', 550)\nStack empty" },

{ id: 20, cat: "python", title: "Stack — Push Only 3-Digit Even Numbers", q: "Accept 10 integers from the user. Push onto a stack only those numbers that are three-digit even numbers. After all inputs, pop and display every element of the stack.", code: "stack = []\nfor i in range(10):\n    n = int(input('Enter: '))\n    if 100 <= n <= 999 and n % 2 == 0:\n        stack.append(n)\n\nprint('Popped elements:')\nwhile stack:\n    print(stack.pop(), end=' ')", output: "Popped elements:\n864 246 420" },

{ id: 21, cat: "python", title: "Stack — Balanced Parentheses Check", q: "Write is_balanced(expr) that uses a stack to check whether the brackets ( ), [ ], { } in an expression are balanced.", code: "def is_balanced(expr):\n    stack = []\n    pairs = {')': '(', ']': '[', '}': '{'}\n    for ch in expr:\n        if ch in '([{':\n            stack.append(ch)\n        elif ch in pairs:\n            if not stack or stack.pop() != pairs[ch]:\n                return False\n    return not stack\n\nprint(is_balanced('(a+b)*[c-d]'))", output: "True" },

{ id: 22, cat: "python", title: "Stack — Menu-Driven Push / Pop / Display", q: "Write a menu-driven program that performs stack operations Push, Pop and Display on a list.", code: "stack = []\nwhile True:\n    print('1.Push 2.Pop 3.Display 4.Exit')\n    ch = int(input('Choice: '))\n    if ch == 1:\n        stack.append(int(input('Value: ')))\n    elif ch == 2:\n        print('Popped:', stack.pop() if stack else 'Empty')\n    elif ch == 3:\n        print('Stack:', stack)\n    else:\n        break", output: "Choice: 1\nValue: 10\nStack: [10]" },

{ id: 23, cat: "python", title: "Stack — Sort a Stack in Ascending Order", q: "Given a list used as a stack, sort its elements in ascending order using only push and pop operations (no built-in sort).", code: "stack = [5, 2, 8, 1, 9]\ntemp = []\nwhile stack:\n    t = stack.pop()\n    while temp and temp[-1] > t:\n        stack.append(temp.pop())\n    temp.append(t)\n\nprint('Sorted:', temp[::-1])", output: "Sorted: [1, 2, 5, 8, 9]" },

{ id: 24, cat: "python", title: "Stack — Push Employees with Salary > 50000", q: "A list emp contains tuples (EmpID, Name, Salary). Using a user-defined function Push(), push onto a stack only those employees whose salary is greater than 50000 and display the final stack.", code: "emp = [(101, 'Amit', 55000), (102, 'Priya', 48000),\n       (103, 'Rahul', 72000)]\nstack = []\n\ndef Push():\n    for e in emp:\n        if e[2] > 50000:\n            stack.append(e)\n\nPush()\nprint('Stack:', stack)", output: "Stack: [(101, 'Amit', 55000), (103, 'Rahul', 72000)]" },

{ id: 25, cat: "python", title: "Count Even–Even Pairs in a Tuple", q: "A tuple 'pairs' contains pairs of integers. Write cnt_event(t) that returns the number of pairs in which both numbers are even.", code: "def cnt_event(t):\n    c = 0\n    for a, b in t:\n        if a % 2 == 0 and b % 2 == 0:\n            c += 1\n    return c\n\npairs = ((2, 5), (4, 2), (9, 8), (12, 10))\nprint('Even-even pairs:', cnt_event(pairs))", output: "Even-even pairs: 2" },

{ id: 26, cat: "python", title: "Sort a Dictionary by Values", q: "Given a dictionary of student marks, sort it in ascending order of marks using sorted() and a lambda key.", code: "d = {'Amit': 88, 'Priya': 92, 'Rahul': 79}\nresult = dict(sorted(d.items(), key=lambda x: x[1]))\nprint(result)", output: "{'Rahul': 79, 'Amit': 88, 'Priya': 92}" },

{ id: 27, cat: "python", title: "Phone Directory — Add and Search", q: "Write a program that maintains a phone directory as a dictionary. Add(name, phone) inserts a contact and Search(name) returns the number or 'Not found'.", code: "directory = {'Amit': '9876543210', 'Priya': '9123456780'}\n\ndef Add(name, phone):\n    directory[name] = phone\n\ndef Search(name):\n    return directory.get(name, 'Not found')\n\nAdd('Rahul', '9998887770')\nprint(Search('Priya'))\nprint(Search('Neha'))", output: "9123456780\nNot found" },

{ id: 28, cat: "python", title: "Filter Even Numbers, Then Square Them", q: "Using filter() and map() together, extract the even numbers from a list and then compute the square of each even number.", code: "nums = [1, 2, 3, 4, 5, 6]\nresult = list(map(lambda x: x*x, filter(lambda x: x % 2 == 0, nums)))\nprint(result)", output: "[4, 16, 36]" },

{ id: 29, cat: "python", title: "Most Frequent Character in a String", q: "Write a program that finds the character occurring the maximum number of times in a string (ignoring spaces).", code: "s = 'artificial intelligence'\nfreq = {}\nfor ch in s:\n    if ch != ' ':\n        freq[ch] = freq.get(ch, 0) + 1\nbest = max(freq, key=freq.get)\nprint('Most frequent:', best, freq[best])", output: "Most frequent: i 6" },

{ id: 30, cat: "python", title: "Transpose of a Matrix", q: "Write a program to find the transpose of a 2 × 3 matrix without using NumPy.", code: "A = [[1, 2, 3], [4, 5, 6]]\nT = [[A[i][j] for i in range(len(A))] for j in range(len(A[0]))]\nprint(T)", output: "[[1, 4], [2, 5], [3, 6]]" },

{ id: 31, cat: "python", title: "Max, Min, Average of a Tuple", q: "Write a program to find the maximum, minimum and average of a tuple of numbers.", code: "t = (12, 45, 7, 30, 18)\nprint('Max:', max(t))\nprint('Min:', min(t))\nprint('Average:', sum(t) / len(t))", output: "Max: 45\nMin: 7\nAverage: 22.4" },

{ id: 32, cat: "python", title: "Recursive Binary → Decimal", q: "Write a recursive function bin_to_dec(b) that converts a binary number (given as an integer) to its decimal equivalent.", code: "def bin_to_dec(b, i=0):\n    if b == 0:\n        return 0\n    return (b % 10) * (2 ** i) + bin_to_dec(b // 10, i + 1)\n\nprint(bin_to_dec(1011))", output: "11" },

{ id: 33, cat: "python", title: "Recursive Count of a Character in a String", q: "Write a recursive function count_char(s, ch) that returns the number of times character ch appears in the string s.", code: "def count_char(s, ch):\n    if not s:\n        return 0\n    return (1 if s[0] == ch else 0) + count_char(s[1:], ch)\n\nprint(count_char('banana', 'a'))", output: "3" },

{ id: 34, cat: "python", title: "Recursive GCD of Two Numbers", q: "Write a recursive function gcd(a, b) to compute the greatest common divisor of two positive integers.", code: "def gcd(a, b):\n    if b == 0:\n        return a\n    return gcd(b, a % b)\n\nprint('GCD:', gcd(48, 18))", output: "GCD: 6" },

{ id: 35, cat: "python", title: "Perfect Number Check", q: "Write a program to check whether a number is a perfect number (sum of proper divisors equals the number itself).", code: "n = 28\ntotal = sum(i for i in range(1, n) if n % i == 0)\nprint('Perfect' if total == n else 'Not Perfect')", output: "Perfect" },

{ id: 36, cat: "python", title: "Palindrome Check (Case-Insensitive)", q: "Write a program to check whether a given string is a palindrome (ignoring case).", code: "s = 'Madam'\ns2 = s.lower()\nprint('Palindrome' if s2 == s2[::-1] else 'Not Palindrome')", output: "Palindrome" },

{ id: 37, cat: "python", title: "Reverse a String Without Slicing", q: "Write a program to reverse a string without using Python's slicing shortcut or built-in reverse.", code: "s = 'Computer'\nrev = ''\nfor ch in s:\n    rev = ch + rev\nprint(rev)", output: "retupmoC" },

{ id: 38, cat: "python", title: "Recursive Sum of a List", q: "Write a recursive function rec_sum(lst) that returns the sum of all elements in a list.", code: "def rec_sum(lst):\n    if not lst:\n        return 0\n    return lst[0] + rec_sum(lst[1:])\n\nprint(rec_sum([1, 2, 3, 4]))", output: "10" },

{ id: 39, cat: "python", title: "Recursive Sum of Digits", q: "Write a recursive function sum_digits(n) that returns the sum of digits of a positive integer n.", code: "def sum_digits(n):\n    if n == 0:\n        return 0\n    return n % 10 + sum_digits(n // 10)\n\nprint(sum_digits(4729))", output: "22" },

{ id: 40, cat: "python", title: "Recursive Count of Digits", q: "Write a recursive function count_digits(n) that returns the number of digits in a positive integer n.", code: "def count_digits(n):\n    if n == 0:\n        return 0\n    return 1 + count_digits(n // 10)\n\nprint(count_digits(20457))", output: "5" },

{ id: 41, cat: "sql", title: "EMP & DEPT — Display Employee with Department", q: "Tables EMP(EMPNO, ENAME, SAL, DEPTNO) and DEPT(DEPTNO, DNAME) are given. Display each employee's ENAME and their department DNAME.", code: "SELECT E.ENAME, D.DNAME\nFROM EMP E\nJOIN DEPT D ON E.DEPTNO = D.DEPTNO;", output: "ENAME | DNAME\nAmit  | Sales\nPriya | HR\nRahul | IT" },

{ id: 42, cat: "sql", title: "EMP & DEPT — Employees in 'Sales'", q: "Display the ENAME and SAL of all employees working in the 'Sales' department using a JOIN between EMP and DEPT.", code: "SELECT E.ENAME, E.SAL\nFROM EMP E\nJOIN DEPT D ON E.DEPTNO = D.DEPTNO\nWHERE D.DNAME = 'Sales';", output: "ENAME | SAL\nAmit  | 55000\nSanya | 51000" },

{ id: 43, cat: "sql", title: "EMP & DEPT — Average Salary per Department", q: "Display DNAME and the average salary of employees in each department.", code: "SELECT D.DNAME, AVG(E.SAL) AS AVG_SAL\nFROM DEPT D\nJOIN EMP E ON D.DEPTNO = E.DEPTNO\nGROUP BY D.DNAME;", output: "DNAME | AVG_SAL\nSales | 53000\nHR    | 48000\nIT    | 72000" },

{ id: 44, cat: "sql", title: "EMP & DEPT — Departments with 2 or More Employees", q: "Display the DNAME and the number of employees for those departments that have at least 2 employees.", code: "SELECT D.DNAME, COUNT(*) AS TOTAL\nFROM DEPT D\nJOIN EMP E ON D.DEPTNO = E.DEPTNO\nGROUP BY D.DNAME\nHAVING COUNT(*) >= 2;", output: "DNAME | TOTAL\nSales | 2" },

{ id: 45, cat: "sql", title: "EMP & DEPT — LEFT JOIN (Depts with No Employees)", q: "Display all department names with their employees, including departments that currently have no employees.", code: "SELECT D.DNAME, E.ENAME\nFROM DEPT D\nLEFT JOIN EMP E ON D.DEPTNO = E.DEPTNO\nORDER BY D.DNAME;", output: "DNAME | ENAME\nHR    | Priya\nIT    | Rahul\nSales | Amit\nSales | Sanya\nFinance | NULL" },

{ id: 46, cat: "sql", title: "EMP & DEPT — Employees Earning Above Dept Average", q: "Display ENAME, SAL and DEPTNO of all employees whose salary is greater than the average salary of their own department.", code: "SELECT E.ENAME, E.SAL, E.DEPTNO\nFROM EMP E\nWHERE E.SAL > (SELECT AVG(SAL) FROM EMP WHERE DEPTNO = E.DEPTNO);", output: "ENAME | SAL   | DEPTNO\nRahul | 72000 | 30" },

{ id: 47, cat: "sql", title: "EMP, DEPT, LOCATION — 3-Table JOIN", q: "Tables EMP, DEPT and LOCATION are given. Display employee name, department name and department city.", code: "SELECT E.ENAME, D.DNAME, L.CITY\nFROM EMP E\nJOIN DEPT D ON E.DEPTNO = D.DEPTNO\nJOIN LOCATION L ON D.LOCID = L.LOCID;", output: "ENAME | DNAME | CITY\nAmit  | Sales | Agra\nPriya | HR    | Delhi\nRahul | IT    | Bangalore" },

{ id: 48, cat: "sql", title: "EMP, DEPT, LOCATION — Filter by City", q: "Using EMP, DEPT and LOCATION, display the ENAME and CITY of employees working in Delhi or Bangalore.", code: "SELECT E.ENAME, L.CITY\nFROM EMP E\nJOIN DEPT D ON E.DEPTNO = D.DEPTNO\nJOIN LOCATION L ON D.LOCID = L.LOCID\nWHERE L.CITY IN ('Delhi', 'Bangalore');", output: "ENAME | CITY\nPriya | Delhi\nRahul | Bangalore" },

{ id: 49, cat: "sql", title: "EMP & DEPT — ORDER BY Dept then Salary", q: "Display ENAME, DNAME and SAL, sorted by department name ascending and then by salary descending within each department.", code: "SELECT E.ENAME, D.DNAME, E.SAL\nFROM EMP E\nJOIN DEPT D ON E.DEPTNO = D.DEPTNO\nORDER BY D.DNAME ASC, E.SAL DESC;", output: "ENAME | DNAME | SAL\nPriya | HR    | 48000\nRahul | IT    | 72000\nAmit  | Sales | 55000\nSanya | Sales | 51000" },

{ id: 50, cat: "sql", title: "EMP & DEPT — Highest Paid Employee per Dept", q: "Display the name, salary and department number of the highest-paid employee of each department.", code: "SELECT E.ENAME, E.SAL, E.DEPTNO\nFROM EMP E\nWHERE E.SAL = (SELECT MAX(SAL) FROM EMP WHERE DEPTNO = E.DEPTNO);", output: "ENAME | SAL   | DEPTNO\nPriya | 48000 | 20\nRahul | 72000 | 30\nAmit  | 55000 | 10" },

{ id: 51, cat: "sql", title: "EMP & DEPT — Employee Count per Department", q: "Display each department name and the number of employees in that department, including departments with zero employees.", code: "SELECT D.DNAME, COUNT(E.EMPNO) AS NUM_EMP\nFROM DEPT D\nLEFT JOIN EMP E ON D.DEPTNO = E.DEPTNO\nGROUP BY D.DNAME;", output: "DNAME   | NUM_EMP\nSales   | 2\nHR      | 1\nIT      | 1\nFinance | 0" },

{ id: 52, cat: "sql", title: "Self Join — Employee & Manager", q: "Table EMP(EMPNO, ENAME, MGR) is given where MGR stores the EMPNO of the manager. Display each employee name with their manager's name.", code: "SELECT E.ENAME AS EMPLOYEE, M.ENAME AS MANAGER\nFROM EMP E\nLEFT JOIN EMP M ON E.MGR = M.EMPNO;", output: "EMPLOYEE | MANAGER\nAmit     | Rahul\nPriya    | Rahul\nRahul    | NULL" },

{ id: 53, cat: "sql", title: "STUDENT & MARKS — Names with Marks", q: "Display the SName and Marks of each student using a JOIN between STUDENT and MARKS.", code: "SELECT S.SName, M.Marks\nFROM STUDENT S\nJOIN MARKS M ON S.RollNo = M.RollNo;", output: "SName | Marks\nAmit  | 88\nAmit  | 92\nPriya | 95\nRahul | 78" },

{ id: 54, cat: "sql", title: "STUDENT, MARKS, SUBJECT — 3-Table JOIN", q: "Using all three tables, display SName, SubName and Marks for every exam record.", code: "SELECT S.SName, SUB.SubName, M.Marks\nFROM STUDENT S\nJOIN MARKS M    ON S.RollNo = M.RollNo\nJOIN SUBJECT SUB ON M.SubCode = SUB.SubCode;", output: "SName | SubName     | Marks\nAmit  | Computer Sc | 88\nAmit  | Mathematics | 92\nPriya | Computer Sc | 95\nRahul | Mathematics | 78" },

{ id: 55, cat: "sql", title: "STUDENT & MARKS — Total Marks per Student", q: "Display SName and total marks obtained by each student, sorted by total marks in descending order.", code: "SELECT S.SName, SUM(M.Marks) AS TOTAL\nFROM STUDENT S\nJOIN MARKS M ON S.RollNo = M.RollNo\nGROUP BY S.RollNo, S.SName\nORDER BY TOTAL DESC;", output: "SName | TOTAL\nPriya | 180\nAmit  | 180\nRahul | 78" },

{ id: 56, cat: "sql", title: "MARKS & SUBJECT — Average Marks per Subject", q: "Display each subject's SubName and its average marks.", code: "SELECT SUB.SubName, AVG(M.Marks) AS AVG_MARKS\nFROM MARKS M\nJOIN SUBJECT SUB ON M.SubCode = SUB.SubCode\nGROUP BY SUB.SubCode, SUB.SubName;", output: "SubName     | AVG_MARKS\nComputer Sc | 91.5\nMathematics | 85.0" },

{ id: 57, cat: "sql", title: "MARKS & SUBJECT — Subject with Highest Average", q: "Display the SubName and average marks of the subject that has the highest average marks.", code: "SELECT SUB.SubName, AVG(M.Marks) AS AVG_MARKS\nFROM MARKS M\nJOIN SUBJECT SUB ON M.SubCode = SUB.SubCode\nGROUP BY SUB.SubCode, SUB.SubName\nHAVING AVG(M.Marks) = (\n    SELECT MAX(avg_m) FROM (\n        SELECT AVG(Marks) AS avg_m FROM MARKS GROUP BY SubCode\n    ) t\n);", output: "SubName     | AVG_MARKS\nComputer Sc | 91.5" },

{ id: 58, cat: "sql", title: "STUDENT & MARKS — Student with Highest Total", q: "Display the SName and total marks of the student(s) who scored the highest total marks.", code: "SELECT S.SName, SUM(M.Marks) AS TOTAL\nFROM STUDENT S\nJOIN MARKS M ON S.RollNo = M.RollNo\nGROUP BY S.RollNo, S.SName\nHAVING SUM(M.Marks) = (\n    SELECT MAX(tot) FROM (\n        SELECT SUM(Marks) AS tot FROM MARKS GROUP BY RollNo\n    ) t\n);", output: "SName | TOTAL\nAmit  | 180\nPriya | 180" },

{ id: 59, cat: "sql", title: "STUDENT & MARKS — Students Who Have No Marks", q: "Display the names of students who have not appeared in any exam (i.e. have no rows in the MARKS table).", code: "SELECT S.SName\nFROM STUDENT S\nLEFT JOIN MARKS M ON S.RollNo = M.RollNo\nWHERE M.RollNo IS NULL;", output: "SName\nRohan\nNeha" },

{ id: 60, cat: "sql", title: "MARKS & SUBJECT — Highest Marks per Subject", q: "Display each subject's SubName and its highest marks.", code: "SELECT SUB.SubName, MAX(M.Marks) AS HIGHEST\nFROM MARKS M\nJOIN SUBJECT SUB ON M.SubCode = SUB.SubCode\nGROUP BY SUB.SubCode, SUB.SubName;", output: "SubName     | HIGHEST\nComputer Sc | 95\nMathematics | 92" },

{ id: 61, cat: "sql", title: "HOTELS & BOOKINGS — Booking with Hotel Name", q: "Display Booking_ID, Customer_Name and Hotel_Name for every booking by joining HOTELS and BOOKINGS.", code: "SELECT B.Booking_ID, B.Customer_Name, H.Hotel_Name\nFROM BOOKINGS B\nJOIN HOTELS H ON B.H_ID = H.H_ID;", output: "Booking_ID | Customer_Name | Hotel_Name\n201        | Amit          | Taj\n202        | Priya         | ITC\n203        | Rahul         | Taj" },

{ id: 62, cat: "sql", title: "HOTELS & BOOKINGS — Bookings in Mumbai", q: "Display the customer names and hotel names for bookings made in hotels located in Mumbai.", code: "SELECT B.Customer_Name, H.Hotel_Name\nFROM BOOKINGS B\nJOIN HOTELS H ON B.H_ID = H.H_ID\nWHERE H.City = 'Mumbai';", output: "Customer_Name | Hotel_Name\nAmit          | Taj\nRahul         | Taj" },

{ id: 63, cat: "sql", title: "HOTELS & BOOKINGS — Booking Count per Hotel", q: "Display each hotel name and the total number of bookings made in that hotel (including hotels with zero bookings).", code: "SELECT H.Hotel_Name, COUNT(B.Booking_ID) AS TOTAL\nFROM HOTELS H\nLEFT JOIN BOOKINGS B ON H.H_ID = B.H_ID\nGROUP BY H.H_ID, H.Hotel_Name;", output: "Hotel_Name | TOTAL\nTaj        | 2\nITC        | 1\nOberoi     | 0" },

{ id: 64, cat: "sql", title: "HOTELS & BOOKINGS — Hotels with 2+ Bookings", q: "Display the hotel names that have received 2 or more bookings along with the booking count.", code: "SELECT H.Hotel_Name, COUNT(*) AS TOTAL\nFROM HOTELS H\nJOIN BOOKINGS B ON H.H_ID = B.H_ID\nGROUP BY H.H_ID, H.Hotel_Name\nHAVING COUNT(*) >= 2;", output: "Hotel_Name | TOTAL\nTaj        | 2" },

{ id: 65, cat: "sql", title: "HOTELS & BOOKINGS — Revenue per Hotel", q: "Display each hotel name and the total revenue generated by that hotel, sorted in descending order of revenue.", code: "SELECT H.Hotel_Name, SUM(B.Amount) AS REVENUE\nFROM HOTELS H\nJOIN BOOKINGS B ON H.H_ID = B.H_ID\nGROUP BY H.H_ID, H.Hotel_Name\nORDER BY REVENUE DESC;", output: "Hotel_Name | REVENUE\nTaj        | 20500\nITC        | 12000" },

/* ============================================================
   SQL — 2 TABLE JOIN:  CUSTOMER + ORDERS
   Schema:
     CUSTOMER(CUST_ID, CName, City, Phone)
     ORDERS(Order_ID, CUST_ID, Order_Date, Amount)
   ============================================================ */
{ id: 66, cat: "sql", title: "CUSTOMER & ORDERS — Orders with Customer Name", q: "Display CName, Order_ID and Amount for each order by joining CUSTOMER and ORDERS.", code: "SELECT C.CName, O.Order_ID, O.Amount\nFROM CUSTOMER C\nJOIN ORDERS O ON C.CUST_ID = O.CUST_ID;", output: "CName | Order_ID | Amount\nAmit  | 5001     | 25000\nPriya | 5002     | 62000\nAmit  | 5003     | 18000" },

{ id: 67, cat: "sql", title: "CUSTOMER & ORDERS — Customers with No Orders", q: "Display the names and cities of customers who have never placed any order.", code: "SELECT C.CName, C.City\nFROM CUSTOMER C\nLEFT JOIN ORDERS O ON C.CUST_ID = O.CUST_ID\nWHERE O.Order_ID IS NULL;", output: "CName | City\nNeha  | Agra\nRohan | Delhi" },

{ id: 68, cat: "sql", title: "CUSTOMER & ORDERS — Total Amount Spent per Customer", q: "Display CName and the total amount spent by each customer, sorted from highest to lowest.", code: "SELECT C.CName, SUM(O.Amount) AS TOTAL_SPENT\nFROM CUSTOMER C\nJOIN ORDERS O ON C.CUST_ID = O.CUST_ID\nGROUP BY C.CUST_ID, C.CName\nORDER BY TOTAL_SPENT DESC;", output: "CName | TOTAL_SPENT\nPriya | 62000\nAmit  | 43000" },

{ id: 69, cat: "sql", title: "CUSTOMER & ORDERS — Orders Above ₹50,000", q: "Display CName and Amount of all orders whose amount is greater than 50,000.", code: "SELECT C.CName, O.Amount\nFROM CUSTOMER C\nJOIN ORDERS O ON C.CUST_ID = O.CUST_ID\nWHERE O.Amount > 50000;", output: "CName | Amount\nPriya | 62000" },

{ id: 70, cat: "sql", title: "CUSTOMER — City-Wise Customer Count", q: "Display each city and the number of customers belonging to that city.", code: "SELECT City, COUNT(*) AS NUM_CUSTOMERS\nFROM CUSTOMER\nGROUP BY City;", output: "City   | NUM_CUSTOMERS\nAgra   | 2\nDelhi  | 2\nMumbai | 1" },

/* ============================================================
   SQL — DDL / DML / CONSTRAINTS
   ============================================================ */
{ id: 71, cat: "sql", title: "CREATE TABLE EMP with PK + FK", q: "Create an EMP table with EMPNO as primary key, ENAME NOT NULL, SAL > 0 (CHECK) and DEPTNO as a foreign key referencing DEPT(DEPTNO).", code: "CREATE TABLE EMP (\n    EMPNO  INT PRIMARY KEY,\n    ENAME  VARCHAR(30) NOT NULL,\n    SAL    FLOAT CHECK (SAL > 0),\n    DEPTNO INT,\n    FOREIGN KEY (DEPTNO) REFERENCES DEPT(DEPTNO)\n);", output: "Table created." },

{ id: 72, cat: "sql", title: "CREATE TABLE STUDENT with Constraints", q: "Create a STUDENT table with ROLLNO as primary key, NAME NOT NULL, CLASS VARCHAR(5) and MARKS INTEGER with a CHECK constraint that MARKS lies between 0 and 100.", code: "CREATE TABLE STUDENT (\n    ROLLNO INT PRIMARY KEY,\n    NAME   VARCHAR(30) NOT NULL,\n    CLASS  VARCHAR(5),\n    MARKS  INT CHECK (MARKS BETWEEN 0 AND 100)\n);", output: "Table created." },

{ id: 73, cat: "sql", title: "ALTER TABLE — Add EMAIL Column", q: "Add a new column EMAIL of type VARCHAR(50) to the existing STUDENT table.", code: "ALTER TABLE STUDENT ADD EMAIL VARCHAR(50);", output: "Column added." },

{ id: 74, cat: "sql", title: "UPDATE — 10% Salary Hike for Dept 10", q: "Increase the salary of all employees in department number 10 by 10%.", code: "UPDATE EMP\nSET SAL = SAL * 1.10\nWHERE DEPTNO = 10;", output: "Rows updated." },

{ id: 75, cat: "sql", title: "DELETE — Remove Employee with EMPNO 103", q: "Delete the record of the employee whose EMPNO is 103 from the EMP table.", code: "DELETE FROM EMP WHERE EMPNO = 103;", output: "1 row deleted." },

{ id: 76, cat: "sql", title: "INSERT — Add a New Department Row", q: "Insert a new record (DEPTNO = 40, DNAME = 'Finance', LOCID = 'L04') into the DEPT table.", code: "INSERT INTO DEPT (DEPTNO, DNAME, LOCID)\nVALUES (40, 'Finance', 'L04');", output: "1 row inserted." },

{ id: 77, cat: "sql", title: "CREATE VIEW — HIGH_SAL", q: "Create a view HIGH_SAL that stores ENAME and SAL of all employees whose salary is greater than 50,000.", code: "CREATE VIEW HIGH_SAL AS\nSELECT ENAME, SAL FROM EMP WHERE SAL > 50000;", output: "View created." },

{ id: 78, cat: "sql", title: "Aggregate Functions on EMP", q: "Display the total number of employees, the highest salary, the lowest salary and the average salary in one query.", code: "SELECT COUNT(*) AS TOTAL,\n       MAX(SAL) AS HIGHEST,\n       MIN(SAL) AS LOWEST,\n       AVG(SAL) AS AVERAGE\nFROM EMP;", output: "TOTAL | HIGHEST | LOWEST | AVERAGE\n5     | 72000   | 48000  | 56800.0" },

{ id: 79, cat: "sql", title: "GROUP BY + HAVING — Depts with > 1 Employee", q: "Display the DEPTNO and number of employees for each department having more than one employee.", code: "SELECT DEPTNO, COUNT(*) AS EMP_COUNT\nFROM EMP\nGROUP BY DEPTNO\nHAVING COUNT(*) > 1;", output: "DEPTNO | EMP_COUNT\n10     | 2" },

{ id: 80, cat: "sql", title: "CASE Expression — Salary Grade", q: "Display ENAME, SAL and a computed GRADE column: 'High' if SAL ≥ 70000, 'Medium' if SAL ≥ 50000, otherwise 'Low'.", code: "SELECT ENAME, SAL,\n    CASE\n        WHEN SAL >= 70000 THEN 'High'\n        WHEN SAL >= 50000 THEN 'Medium'\n        ELSE 'Low'\n    END AS GRADE\nFROM EMP;", output: "ENAME | SAL   | GRADE\nAmit  | 55000 | Medium\nPriya | 48000 | Low\nRahul | 72000 | High" }
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