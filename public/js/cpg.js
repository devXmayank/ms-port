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
{ id: 1, cat: "python", title: "Swap Adjacent Elements of a List", q: "Write a Python function Swap_Alt(L) that accepts a list of integers and swaps every pair of adjacent elements (1st with 2nd, 3rd with 4th and so on). If the list has an odd number of elements, the last element remains unchanged. Display the list before and after the function call.", code: "def Swap_Alt(L):\n    for i in range(0, len(L) - 1, 2):\n        L[i], L[i + 1] = L[i + 1], L[i]\n\nnums = [10, 20, 30, 40, 50, 60, 70]\nprint(\"Before swapping:\", nums)\nSwap_Alt(nums)\nprint(\"After swapping :\", nums)", output: "Before swapping: [10, 20, 30, 40, 50, 60, 70]\nAfter swapping : [20, 10, 40, 30, 60, 50, 70]" },
{ id: 2, cat: "python", title: "Display Lines Starting with 'T' from a Text File", q: "Write a function in Python to read lines from the text file STORY.TXT and display only those lines which start with the letter 'T'. Also display the number of such lines.", code: "lines = [\n    \"The sun rose over the hills.\\n\",\n    \"A little bird sang in the old tree.\\n\",\n    \"India is a land of many languages.\\n\",\n    \"The children played in the park.\\n\",\n    \"Technology is changing the way we learn.\\n\",\n    \"She sells sea shells by the sea shore.\\n\",\n    \"To succeed, one must work with focus.\\n\"\n]\nwith open(\"STORY.TXT\", \"w\") as f:\n    f.writelines(lines)\n\ndef Show_T_Lines():\n    count = 0\n    with open(\"STORY.TXT\", \"r\") as f:\n        for line in f:\n            if line.startswith(\"T\"):\n                print(line, end=\"\")\n                count += 1\n    print(\"Number of lines starting with 'T':\", count)\n\nShow_T_Lines()", output: "The sun rose over the hills.\nThe children played in the park.\nTechnology is changing the way we learn.\nTo succeed, one must work with focus.\nNumber of lines starting with 'T': 4" },
{ id: 3, cat: "python", title: "Create and Display a Binary File of Students", q: "A binary file STUDENT.DAT stores records of students in the form [rollno, name, marks]. Write functions Create() to write 5 records into the file using pickle and Display() to read and display all the records.", code: "import pickle\n\ndef Create():\n    data = [[1, \"Aarav\", 88], [2, \"Diya\", 92], [3, \"Kabir\", 67],\n            [4, \"Isha\", 74], [5, \"Rohan\", 81]]\n    with open(\"STUDENT.DAT\", \"wb\") as f:\n        for rec in data:\n            pickle.dump(rec, f)\n    print(\"File created successfully.\")\n\ndef Display():\n    with open(\"STUDENT.DAT\", \"rb\") as f:\n        try:\n            while True:\n                rec = pickle.load(f)\n                print(\"Roll:\", rec[0], \" Name:\", rec[1], \" Marks:\", rec[2])\n        except EOFError:\n            pass\n\nCreate()\nDisplay()", output: "File created successfully.\nRoll: 1  Name: Aarav  Marks: 88\nRoll: 2  Name: Diya  Marks: 92\nRoll: 3  Name: Kabir  Marks: 67\nRoll: 4  Name: Isha  Marks: 74\nRoll: 5  Name: Rohan  Marks: 81" },
{ id: 4, cat: "python", title: "Write and Read a CSV File", q: "Write a Python program to create a CSV file STUDENT.CSV with the header (Roll, Name, Marks) using writerow(), add four more records using writerows() and then read and display all the records using the csv.reader object.", code: "import csv\n\nwith open(\"STUDENT.CSV\", \"w\", newline=\"\") as f:\n    w = csv.writer(f)\n    w.writerow([\"Roll\", \"Name\", \"Marks\"])\n    w.writerows([[1, \"Aarav\", 88], [2, \"Diya\", 92],\n                 [3, \"Kabir\", 67], [4, \"Isha\", 74]])\n\nwith open(\"STUDENT.CSV\", \"r\") as f:\n    r = csv.reader(f)\n    for row in r:\n        print(row)", output: "['Roll', 'Name', 'Marks']\n['1', 'Aarav', '88']\n['2', 'Diya', '92']\n['3', 'Kabir', '67']\n['4', 'Isha', '74']" },
{ id: 5, cat: "python", title: "Menu-Driven Stack: PUSH, POP, PEEK and DISPLAY", q: "Write a menu-driven Python program to implement a stack using a list with the operations PUSH, POP, PEEK and DISPLAY. Display a suitable message when the stack is empty (underflow).", code: "stack = []\n\ndef push(x):\n    stack.append(x)\n\ndef pop():\n    if stack == []:\n        return \"Underflow\"\n    return stack.pop()\n\ndef peek():\n    if stack == []:\n        return \"Underflow\"\n    return stack[-1]\n\nwhile True:\n    print(\"1.PUSH  2.POP  3.PEEK  4.DISPLAY  5.EXIT\")\n    ch = int(input(\"Enter choice: \"))\n    if ch == 1:\n        push(int(input(\"Enter element: \")))\n    elif ch == 2:\n        print(\"Popped:\", pop())\n    elif ch == 3:\n        print(\"Top element:\", peek())\n    elif ch == 4:\n        print(\"Stack (top to bottom):\", stack[::-1])\n    else:\n        break", output: "1.PUSH  2.POP  3.PEEK  4.DISPLAY  5.EXIT\nEnter choice: 1\nEnter element: 10\n1.PUSH  2.POP  3.PEEK  4.DISPLAY  5.EXIT\nEnter choice: 1\nEnter element: 20\n1.PUSH  2.POP  3.PEEK  4.DISPLAY  5.EXIT\nEnter choice: 1\nEnter element: 30\n1.PUSH  2.POP  3.PEEK  4.DISPLAY  5.EXIT\nEnter choice: 4\nStack (top to bottom): [30, 20, 10]\n1.PUSH  2.POP  3.PEEK  4.DISPLAY  5.EXIT\nEnter choice: 3\nTop element: 30\n1.PUSH  2.POP  3.PEEK  4.DISPLAY  5.EXIT\nEnter choice: 2\nPopped: 30\n1.PUSH  2.POP  3.PEEK  4.DISPLAY  5.EXIT\nEnter choice: 2\nPopped: 20\n1.PUSH  2.POP  3.PEEK  4.DISPLAY  5.EXIT\nEnter choice: 2\nPopped: 10\n1.PUSH  2.POP  3.PEEK  4.DISPLAY  5.EXIT\nEnter choice: 2\nPopped: Underflow\n1.PUSH  2.POP  3.PEEK  4.DISPLAY  5.EXIT\nEnter choice: 2\nPopped: Underflow\n1.PUSH  2.POP  3.PEEK  4.DISPLAY  5.EXIT\nEnter choice: 5" },
{ id: 6, cat: "python", title: "Display All Records Using fetchall()", q: "The table STUDENT(ROLLNO, NAME, CLASS, MARKS) in the database SCHOOL contains these records: (1, Aarav, XII-A, 88), (2, Diya, XII-A, 92), (3, Kabir, XII-B, 67), (4, Isha, XII-B, 74), (5, Rohan, XII-A, 81). Write a Python program to connect to MySQL, display all the records of the table and the total number of records using rowcount.", code: "import mysql.connector as sqltor\n\ncon = sqltor.connect(host=\"localhost\", user=\"root\", passwd=\"root\", database=\"SCHOOL\")\nif con.is_connected():\n    print(\"Connected to MySQL successfully.\")\ncur = con.cursor()\ncur.execute(\"SELECT * FROM STUDENT\")\ndata = cur.fetchall()\nfor row in data:\n    print(row)\nprint(\"Total records:\", cur.rowcount)\ncon.close()", output: "Connected to MySQL successfully.\n(1, 'Aarav', 'XII-A', 88)\n(2, 'Diya', 'XII-A', 92)\n(3, 'Kabir', 'XII-B', 67)\n(4, 'Isha', 'XII-B', 74)\n(5, 'Rohan', 'XII-A', 81)\nTotal records: 5" },
{ id: 7, cat: "python", title: "Alphabets, Digits and Special Characters Count", q: "Write a function Analyse(S) that accepts a string and returns a tuple containing the count of alphabets, digits, spaces and special characters present in it. Call the function for a sample string and display the result in a formatted manner.", code: "def Analyse(S):\n    alpha = digit = space = special = 0\n    for ch in S:\n        if ch.isalpha():\n            alpha += 1\n        elif ch.isdigit():\n            digit += 1\n        elif ch.isspace():\n            space += 1\n        else:\n            special += 1\n    return alpha, digit, space, special\n\ntext = \"CBSE Class XII - Computer Science (083) Session 2026-27!\"\na, d, s, sp = Analyse(text)\nprint(\"String            :\", text)\nprint(\"Alphabets         :\", a)\nprint(\"Digits            :\", d)\nprint(\"Spaces            :\", s)\nprint(\"Special characters:\", sp)", output: "String            : CBSE Class XII - Computer Science (083) Session 2026-27!\nAlphabets         : 34\nDigits            : 9\nSpaces            : 8\nSpecial characters: 5" },
{ id: 8, cat: "python", title: "Count the Word 'the' in a Text File", q: "Write a function Count_The() in Python to read the file STORY.TXT and count the number of times the word 'the' (in any case) appears in it.", code: "lines = [\n    \"The sun rose over the hills.\\n\",\n    \"A little bird sang in the old tree.\\n\",\n    \"India is a land of many languages.\\n\",\n    \"The children played in the park.\\n\",\n    \"Technology is changing the way we learn.\\n\",\n    \"She sells sea shells by the sea shore.\\n\",\n    \"To succeed, one must work with focus.\\n\"\n]\nwith open(\"STORY.TXT\", \"w\") as f:\n    f.writelines(lines)\n\ndef Count_The():\n    count = 0\n    with open(\"STORY.TXT\", \"r\") as f:\n        for line in f:\n            for word in line.split():\n                if word.strip(\".,\").lower() == \"the\":\n                    count += 1\n    return count\n\nprint(\"The word 'the' appears\", Count_The(), \"times\")", output: "The word 'the' appears 7 times" },
{ id: 9, cat: "python", title: "Search a Record in a Binary File", q: "Write a function Search(roll) that searches for a student with the given roll number in the binary file STUDENT.DAT (records of the form [rollno, name, marks]) and displays the record. If the record is not present, display a suitable message.", code: "import pickle\n\nwith open(\"STUDENT.DAT\", \"wb\") as f:\n    for rec in [[1, \"Aarav\", 88], [2, \"Diya\", 92], [3, \"Kabir\", 67], [4, \"Isha\", 74]]:\n        pickle.dump(rec, f)\n\ndef Search(roll):\n    found = False\n    with open(\"STUDENT.DAT\", \"rb\") as f:\n        try:\n            while True:\n                rec = pickle.load(f)\n                if rec[0] == roll:\n                    print(\"Record found:\", rec)\n                    found = True\n                    break\n        except EOFError:\n            pass\n    if not found:\n        print(\"Record with roll number\", roll, \"not found.\")\n\nfor _ in range(2):\n    r = int(input(\"Enter roll number to search: \"))\n    Search(r)", output: "Enter roll number to search: 3\nRecord found: [3, 'Kabir', 67]\nEnter roll number to search: 9\nRecord with roll number 9 not found." },
{ id: 10, cat: "python", title: "Search a Record in a CSV File", q: "Write a function SearchName(name) that searches for a student by name in the CSV file STUDENT.CSV (columns Roll, Name, Marks) and displays the record. If the name is not found, display a suitable message.", code: "import csv\n\nwith open(\"STUDENT.CSV\", \"w\", newline=\"\") as f:\n    w = csv.writer(f)\n    w.writerows([[\"Roll\", \"Name\", \"Marks\"], [1, \"Aarav\", 88], [2, \"Diya\", 92],\n                 [3, \"Kabir\", 67], [4, \"Isha\", 74]])\n\ndef SearchName(name):\n    found = False\n    with open(\"STUDENT.CSV\", \"r\") as f:\n        r = csv.reader(f)\n        next(r)\n        for row in r:\n            if row[1].lower() == name.lower():\n                print(\"Roll:\", row[0], \"Name:\", row[1], \"Marks:\", row[2])\n                found = True\n    if not found:\n        print(name, \"not found in the file.\")\n\nfor _ in range(2):\n    SearchName(input(\"Enter name to search: \"))", output: "Enter name to search: isha\nRoll: 4 Name: Isha Marks: 74\nEnter name to search: Meera\nMeera not found in the file." },
{ id: 11, cat: "python", title: "Push Multiples of 5 from a List into a Stack", q: "Write functions PushOn(stack, L) to push all the elements of list L that are divisible by 5 into the stack and PopAll(stack) to pop and display all the elements of the stack one by one until it becomes empty.", code: "def PushOn(stack, L):\n    for x in L:\n        if x % 5 == 0:\n            stack.append(x)\n\ndef PopAll(stack):\n    while stack:\n        print(\"Popped:\", stack.pop())\n    print(\"Stack is empty.\")\n\nnums = [12, 25, 7, 40, 15, 33, 50, 8]\nS = []\nPushOn(S, nums)\nprint(\"Stack after pushing:\", S)\nPopAll(S)", output: "Stack after pushing: [25, 40, 15, 50]\nPopped: 50\nPopped: 15\nPopped: 40\nPopped: 25\nStack is empty." },
{ id: 12, cat: "python", title: "Insert a Record Using Parameterised Query", q: "The table STUDENT(ROLLNO, NAME, CLASS, MARKS) in the database SCHOOL contains these records: (1, Aarav, XII-A, 88), (2, Diya, XII-A, 92), (3, Kabir, XII-B, 67), (4, Isha, XII-B, 74), (5, Rohan, XII-A, 81). Write a Python program to accept the details of a new student from the user, insert the record into the table using a parameterised query, save the changes and display the table.", code: "import mysql.connector as sqltor\n\ncon = sqltor.connect(host=\"localhost\", user=\"root\", passwd=\"root\", database=\"SCHOOL\")\ncur = con.cursor()\nroll = int(input(\"Enter roll number: \"))\nname = input(\"Enter name: \")\ncls = input(\"Enter class: \")\nmarks = int(input(\"Enter marks: \"))\nq = \"INSERT INTO STUDENT VALUES (%s, %s, %s, %s)\"\ncur.execute(q, (roll, name, cls, marks))\ncon.commit()\nprint(\"Record inserted successfully.\")\ncur.execute(\"SELECT * FROM STUDENT\")\nfor row in cur.fetchall():\n    print(row)\ncon.close()", output: "Enter roll number: 6\nEnter name: Tanya\nEnter class: XII-B\nEnter marks: 79\nRecord inserted successfully.\n(1, 'Aarav', 'XII-A', 88)\n(2, 'Diya', 'XII-A', 92)\n(3, 'Kabir', 'XII-B', 67)\n(4, 'Isha', 'XII-B', 74)\n(5, 'Rohan', 'XII-A', 81)\n(6, 'Tanya', 'XII-B', 79)" },
{ id: 13, cat: "python", title: "Function with Default Parameters: Interest", q: "Write a function Interest(p, r=8, t=1, kind='simple') that returns the simple or compound interest depending on the value of kind. Demonstrate calls using positional arguments, keyword arguments and default arguments.", code: "def Interest(p, r=8, t=1, kind=\"simple\"):\n    if kind == \"simple\":\n        return round(p * r * t / 100, 2)\n    return round(p * ((1 + r / 100) ** t - 1), 2)\n\nprint(\"Default values          :\", Interest(10000))\nprint(\"Positional (r=5, t=3)   :\", Interest(10000, 5, 3))\nprint(\"Keyword (t=2, r=10)     :\", Interest(10000, t=2, r=10))\nprint(\"Compound, 3 years at 5% :\", Interest(10000, 5, 3, \"compound\"))\nprint(\"Compound using keywords :\", Interest(p=25000, kind=\"compound\", t=2))", output: "Default values          : 800.0\nPositional (r=5, t=3)   : 1500.0\nKeyword (t=2, r=10)     : 2000.0\nCompound, 3 years at 5% : 1576.25\nCompound using keywords : 4160.0" },
{ id: 14, cat: "python", title: "Vowels, Consonants, Uppercase and Lowercase Count", q: "Write a function in Python that reads the text file STORY.TXT and counts the number of vowels, consonants, uppercase and lowercase characters present in it.", code: "lines = [\n    \"The sun rose over the hills.\\n\",\n    \"A little bird sang in the old tree.\\n\",\n    \"India is a land of many languages.\\n\",\n    \"The children played in the park.\\n\",\n    \"Technology is changing the way we learn.\\n\",\n    \"She sells sea shells by the sea shore.\\n\",\n    \"To succeed, one must work with focus.\\n\"\n]\nwith open(\"STORY.TXT\", \"w\") as f:\n    f.writelines(lines)\n\ndef Count_Chars():\n    v = c = u = l = 0\n    with open(\"STORY.TXT\", \"r\") as f:\n        data = f.read()\n    for ch in data:\n        if ch.isalpha():\n            if ch.lower() in \"aeiou\":\n                v += 1\n            else:\n                c += 1\n            if ch.isupper():\n                u += 1\n            else:\n                l += 1\n    print(\"Vowels     :\", v)\n    print(\"Consonants :\", c)\n    print(\"Uppercase  :\", u)\n    print(\"Lowercase  :\", l)\n\nCount_Chars()", output: "Vowels     : 70\nConsonants : 124\nUppercase  : 7\nLowercase  : 187" },
{ id: 15, cat: "python", title: "Display and Count Students Scoring Above 75", q: "Write a function CountHigh() that reads the binary file STUDENT.DAT (records of the form [rollno, name, marks]), displays the records of students who scored more than 75 marks and also displays the total number of such students.", code: "import pickle\n\nwith open(\"STUDENT.DAT\", \"wb\") as f:\n    for rec in [[1, \"Aarav\", 88], [2, \"Diya\", 92], [3, \"Kabir\", 67],\n                [4, \"Isha\", 74], [5, \"Rohan\", 81], [6, \"Tanya\", 79]]:\n        pickle.dump(rec, f)\n\ndef CountHigh():\n    count = 0\n    with open(\"STUDENT.DAT\", \"rb\") as f:\n        try:\n            while True:\n                rec = pickle.load(f)\n                if rec[2] > 75:\n                    print(rec)\n                    count += 1\n        except EOFError:\n            pass\n    print(\"Students with marks above 75:\", count)\n\nCountHigh()", output: "[1, 'Aarav', 88]\n[2, 'Diya', 92]\n[5, 'Rohan', 81]\n[6, 'Tanya', 79]\nStudents with marks above 75: 4" },
{ id: 16, cat: "python", title: "Count Records and Total Using CSV", q: "A CSV file SALES.CSV has the columns Item, Qty and Price. Write a program to read the file and display the number of records, the amount (Qty x Price) of each item, the total sales amount and the item with the highest amount.", code: "import csv\n\nwith open(\"SALES.CSV\", \"w\", newline=\"\") as f:\n    w = csv.writer(f)\n    w.writerows([[\"Item\", \"Qty\", \"Price\"], [\"Notebook\", 10, 45], [\"Backpack\", 2, 850],\n                 [\"Gel Pen\", 25, 12], [\"Lunch Box\", 3, 260]])\n\ncount = 0\ntotal = 0\nbest_item, best_amt = \"\", 0\nwith open(\"SALES.CSV\", \"r\") as f:\n    r = csv.reader(f)\n    next(r)\n    for row in r:\n        amt = int(row[1]) * int(row[2])\n        print(f\"{row[0]:<10} {amt:>6}\")\n        count += 1\n        total += amt\n        if amt > best_amt:\n            best_item, best_amt = row[0], amt\nprint(\"Number of records :\", count)\nprint(\"Total sales       :\", total)\nprint(\"Highest amount    :\", best_item, best_amt)", output: "Notebook      450\nBackpack     1700\nGel Pen       300\nLunch Box     780\nNumber of records : 4\nTotal sales       : 3230\nHighest amount    : Backpack 1700" },
{ id: 17, cat: "python", title: "Stack of Names with Salary Above a Limit", q: "A dictionary EMP stores employee names as keys and salaries as values. Write a function PushHigh(S, EMP, limit) to push the names of employees having salary greater than the given limit into the stack S, and a function PopNames(S) to pop and display all the names.", code: "def PushHigh(S, EMP, limit):\n    for name in EMP:\n        if EMP[name] > limit:\n            S.append(name)\n\ndef PopNames(S):\n    while S:\n        print(S.pop())\n\nEMP = {\"Rahul\": 52000, \"Neha\": 61000, \"Amit\": 45000, \"Pooja\": 75000, \"Sneha\": 39000}\nS = []\nPushHigh(S, EMP, 50000)\nprint(\"Stack:\", S)\nprint(\"Names popped from the stack:\")\nPopNames(S)", output: "Stack: ['Rahul', 'Neha', 'Pooja']\nNames popped from the stack:\nPooja\nNeha\nRahul" },
{ id: 18, cat: "python", title: "Update Marks of a Student", q: "The table STUDENT(ROLLNO, NAME, CLASS, MARKS) in the database SCHOOL contains these records: (1, Aarav, XII-A, 88), (2, Diya, XII-A, 92), (3, Kabir, XII-B, 67), (4, Isha, XII-B, 74), (5, Rohan, XII-A, 81). Write a Python program to increase the marks of all students of class XII-B by 5 using an UPDATE query, display the number of records updated and the table after the update.", code: "import mysql.connector as sqltor\n\ncon = sqltor.connect(host=\"localhost\", user=\"root\", passwd=\"root\", database=\"SCHOOL\")\ncur = con.cursor()\ncur.execute(\"UPDATE STUDENT SET MARKS = MARKS + 5 WHERE CLASS = %s\", (\"XII-B\",))\ncon.commit()\nprint(cur.rowcount, \"record(s) updated.\")\ncur.execute(\"SELECT * FROM STUDENT ORDER BY ROLLNO\")\nfor row in cur.fetchall():\n    print(row)\ncon.close()", output: "2 record(s) updated.\n(1, 'Aarav', 'XII-A', 88)\n(2, 'Diya', 'XII-A', 92)\n(3, 'Kabir', 'XII-B', 72)\n(4, 'Isha', 'XII-B', 79)\n(5, 'Rohan', 'XII-A', 81)" },
{ id: 19, cat: "python", title: "Scope of Variables: Local and Global", q: "Write a Python program to demonstrate the scope of variables. Use a global variable, a local variable with the same name and the global keyword inside functions, and display the values to show how each function affects the global variable.", code: "count = 100\n\ndef show_local():\n    count = 5\n    print(\"Inside show_local()  : count =\", count)\n\ndef update_global():\n    global count\n    count = count + 50\n    print(\"Inside update_global(): count =\", count)\n\ndef read_only():\n    print(\"Inside read_only()   : count =\", count)\n\nprint(\"Before calling functions: count =\", count)\nshow_local()\nread_only()\nupdate_global()\nprint(\"After calling functions : count =\", count)", output: "Before calling functions: count = 100\nInside show_local()  : count = 5\nInside read_only()   : count = 100\nInside update_global(): count = 150\nAfter calling functions : count = 150" },
{ id: 20, cat: "python", title: "Display Words with Less Than 4 Characters", q: "Write a function in Python to read the text file STORY.TXT and display all the words which have less than 4 characters. Also display how many such words are present.", code: "lines = [\n    \"The sun rose over the hills.\\n\",\n    \"A little bird sang in the old tree.\\n\",\n    \"India is a land of many languages.\\n\",\n    \"The children played in the park.\\n\",\n    \"Technology is changing the way we learn.\\n\",\n    \"She sells sea shells by the sea shore.\\n\",\n    \"To succeed, one must work with focus.\\n\"\n]\nwith open(\"STORY.TXT\", \"w\") as f:\n    f.writelines(lines)\n\ndef Short_Words():\n    n = 0\n    with open(\"STORY.TXT\", \"r\") as f:\n        for line in f:\n            for w in line.split():\n                w = w.strip(\".,\")\n                if len(w) < 4:\n                    print(w, end=\"  \")\n                    n += 1\n    print()\n    print(\"Total short words:\", n)\n\nShort_Words()", output: "The  sun  the  A  in  the  old  is  a  of  The  in  the  is  the  way  we  She  sea  by  the  sea  To  one  \nTotal short words: 24" },
{ id: 21, cat: "python", title: "Update Marks in a Binary File", q: "Write a function Update(roll, newmarks) that updates the marks of a student in the binary file STUDENT.DAT using seek() and tell(). Display all records before and after the update.", code: "import pickle\n\nwith open(\"STUDENT.DAT\", \"wb\") as f:\n    for rec in [[1, \"Aarav\", 88], [2, \"Diya\", 92], [3, \"Kabir\", 67]]:\n        pickle.dump(rec, f)\n\ndef ShowAll():\n    with open(\"STUDENT.DAT\", \"rb\") as f:\n        try:\n            while True:\n                print(pickle.load(f))\n        except EOFError:\n            pass\n\ndef Update(roll, newmarks):\n    with open(\"STUDENT.DAT\", \"rb+\") as f:\n        try:\n            while True:\n                pos = f.tell()\n                rec = pickle.load(f)\n                if rec[0] == roll:\n                    rec[2] = newmarks\n                    f.seek(pos)\n                    pickle.dump(rec, f)\n                    print(\"Record updated.\")\n                    return\n        except EOFError:\n            print(\"Roll number not found.\")\n\nprint(\"Before update:\")\nShowAll()\nUpdate(3, 71)\nprint(\"After update:\")\nShowAll()", output: "Before update:\n[1, 'Aarav', 88]\n[2, 'Diya', 92]\n[3, 'Kabir', 67]\nRecord updated.\nAfter update:\n[1, 'Aarav', 88]\n[2, 'Diya', 92]\n[3, 'Kabir', 71]" },
{ id: 22, cat: "python", title: "Login Credentials in CSV: Add() and Search()", q: "A CSV file PASSWORD.CSV contains the user id and password of users. Write a function Add(uid, pwd) to append a new record to the file and a function Search(uid) which displays the password of the given user id, or a message if the user id does not exist.", code: "import csv\n\nwith open(\"PASSWORD.CSV\", \"w\", newline=\"\") as f:\n    csv.writer(f).writerows([[\"user1\", \"abc@123\"], [\"user2\", \"xyz#456\"]])\n\ndef Add(uid, pwd):\n    with open(\"PASSWORD.CSV\", \"a\", newline=\"\") as f:\n        csv.writer(f).writerow([uid, pwd])\n    print(\"Record added for\", uid)\n\ndef Search(uid):\n    with open(\"PASSWORD.CSV\", \"r\") as f:\n        for row in csv.reader(f):\n            if row[0] == uid:\n                print(\"Password of\", uid, \"is\", row[1])\n                return\n    print(\"User id\", uid, \"does not exist.\")\n\nAdd(\"user3\", \"cs@2026\")\nSearch(\"user3\")\nSearch(\"user9\")", output: "Record added for user3\nPassword of user3 is cs@2026\nUser id user9 does not exist." },
{ id: 23, cat: "python", title: "Stack of Tuples: Item Records", q: "Items are stored as tuples (icode, iname, price). Write functions to push an item onto a stack, pop an item (display 'Underflow' if the stack is empty) and check whether the stack is empty. Demonstrate with a few operations.", code: "def isEmpty(S):\n    return len(S) == 0\n\ndef Push(S, item):\n    S.append(item)\n\ndef Pop(S):\n    if isEmpty(S):\n        return \"Underflow\"\n    return S.pop()\n\nItemStack = []\nPush(ItemStack, (1001, \"Notebook\", 45))\nPush(ItemStack, (1003, \"Backpack\", 850))\nPush(ItemStack, (1005, \"Geometry Box\", 120))\nprint(\"Is stack empty?\", isEmpty(ItemStack))\nfor _ in range(4):\n    print(\"Popped:\", Pop(ItemStack))\nprint(\"Is stack empty?\", isEmpty(ItemStack))", output: "Is stack empty? False\nPopped: (1005, 'Geometry Box', 120)\nPopped: (1003, 'Backpack', 850)\nPopped: (1001, 'Notebook', 45)\nPopped: Underflow\nIs stack empty? True" },
{ id: 24, cat: "python", title: "Search a Student Using fetchone()", q: "The table STUDENT(ROLLNO, NAME, CLASS, MARKS) in the database SCHOOL contains these records: (1, Aarav, XII-A, 88), (2, Diya, XII-A, 92), (3, Kabir, XII-B, 67), (4, Isha, XII-B, 74), (5, Rohan, XII-A, 81). Write a Python program to accept a roll number from the user and display the details of that student using fetchone(). If no record is found, display a message.", code: "import mysql.connector as sqltor\n\ncon = sqltor.connect(host=\"localhost\", user=\"root\", passwd=\"root\", database=\"SCHOOL\")\ncur = con.cursor()\nfor _ in range(2):\n    r = int(input(\"Enter roll number to search: \"))\n    cur.execute(\"SELECT * FROM STUDENT WHERE ROLLNO = %s\", (r,))\n    rec = cur.fetchone()\n    if rec is None:\n        print(\"No student found with roll number\", r)\n    else:\n        print(\"Roll:\", rec[0], \"| Name:\", rec[1], \"| Class:\", rec[2], \"| Marks:\", rec[3])\ncon.close()", output: "Enter roll number to search: 4\nRoll: 4 | Name: Isha | Class: XII-B | Marks: 74\nEnter roll number to search: 12\nNo student found with roll number 12" },
{ id: 25, cat: "python", title: "Grade Report from a Dictionary of Marks", q: "Write a function Make_Grades(D) which accepts a dictionary having student names as keys and marks as values and returns a new dictionary with the name and grade (A: 90 and above, B: 75-89, C: 60-74, D: below 60). Also display the name of the topper.", code: "def Make_Grades(D):\n    G = {}\n    for name, marks in D.items():\n        if marks >= 90:\n            G[name] = \"A\"\n        elif marks >= 75:\n            G[name] = \"B\"\n        elif marks >= 60:\n            G[name] = \"C\"\n        else:\n            G[name] = \"D\"\n    return G\n\nmarks = {\"Aarav\": 92, \"Diya\": 78, \"Kabir\": 55, \"Isha\": 66, \"Rohan\": 84}\ngrades = Make_Grades(marks)\nfor n in grades:\n    print(f\"{n:<8} {marks[n]:>3}  Grade {grades[n]}\")\ntop = max(marks, key=marks.get)\nprint(\"Topper:\", top, \"with\", marks[top], \"marks\")", output: "Aarav     92  Grade A\nDiya      78  Grade B\nKabir     55  Grade D\nIsha      66  Grade C\nRohan     84  Grade B\nTopper: Aarav with 92 marks" },
{ id: 26, cat: "python", title: "Copy Lines Without Letter 'a' to Another File", q: "Write a function in Python that reads the file STORY.TXT and copies all the lines that do not contain the letter 'a' (in any case) to a new file NOA.TXT. Display the contents of both files.", code: "lines = [\n    \"The sun rose over the hills.\\n\",\n    \"A little bird sang in the old tree.\\n\",\n    \"India is a land of many languages.\\n\",\n    \"The children played in the park.\\n\",\n    \"Technology is changing the way we learn.\\n\",\n    \"She sells sea shells by the sea shore.\\n\",\n    \"To succeed, one must work with focus.\\n\"\n]\nwith open(\"STORY.TXT\", \"w\") as f:\n    f.writelines(lines)\n\ndef Copy_No_A():\n    with open(\"STORY.TXT\", \"r\") as src, open(\"NOA.TXT\", \"w\") as dst:\n        for line in src:\n            if \"a\" not in line.lower():\n                dst.write(line)\n\nCopy_No_A()\nprint(\"Contents of NOA.TXT:\")\nwith open(\"NOA.TXT\", \"r\") as f:\n    print(f.read())", output: "Contents of NOA.TXT:\nThe sun rose over the hills.\nTo succeed, one must work with focus." },
{ id: 27, cat: "python", title: "Delete a Record from a Binary File", q: "Write a function Delete(roll) to remove the record of a given roll number from the binary file STUDENT.DAT by copying the remaining records to a temporary file, deleting the original file and renaming the temporary file.", code: "import pickle, os\n\nwith open(\"STUDENT.DAT\", \"wb\") as f:\n    for rec in [[1, \"Aarav\", 88], [2, \"Diya\", 92], [3, \"Kabir\", 67], [4, \"Isha\", 74]]:\n        pickle.dump(rec, f)\n\ndef Delete(roll):\n    found = False\n    with open(\"STUDENT.DAT\", \"rb\") as fin, open(\"TEMP.DAT\", \"wb\") as fout:\n        try:\n            while True:\n                rec = pickle.load(fin)\n                if rec[0] == roll:\n                    found = True\n                else:\n                    pickle.dump(rec, fout)\n        except EOFError:\n            pass\n    os.remove(\"STUDENT.DAT\")\n    os.rename(\"TEMP.DAT\", \"STUDENT.DAT\")\n    print(\"Record deleted.\" if found else \"Record not found.\")\n\nDelete(2)\nDelete(8)\nprint(\"Remaining records:\")\nwith open(\"STUDENT.DAT\", \"rb\") as f:\n    try:\n        while True:\n            print(pickle.load(f))\n    except EOFError:\n        pass", output: "Record deleted.\nRecord not found.\nRemaining records:\n[1, 'Aarav', 88]\n[3, 'Kabir', 67]\n[4, 'Isha', 74]" },
{ id: 28, cat: "python", title: "Copy Records with a Condition to Another CSV File", q: "The CSV file EMP.CSV stores (Ecode, Name, Salary). Write a program to copy only those records whose salary is more than 50000 to a new CSV file HIGH.CSV (including the header) and display the contents of the new file.", code: "import csv\n\nwith open(\"EMP.CSV\", \"w\", newline=\"\") as f:\n    csv.writer(f).writerows([[\"Ecode\", \"Name\", \"Salary\"], [101, \"Rahul Sharma\", 52000],\n        [102, \"Neha Verma\", 61000], [103, \"Amit Singh\", 45000], [104, \"Pooja Gupta\", 75000]])\n\nwith open(\"EMP.CSV\", \"r\") as fin, open(\"HIGH.CSV\", \"w\", newline=\"\") as fout:\n    r = csv.reader(fin)\n    w = csv.writer(fout)\n    w.writerow(next(r))\n    for row in r:\n        if int(row[2]) > 50000:\n            w.writerow(row)\n\nwith open(\"HIGH.CSV\", \"r\") as f:\n    for row in csv.reader(f):\n        print(row)", output: "['Ecode', 'Name', 'Salary']\n['101', 'Rahul Sharma', '52000']\n['102', 'Neha Verma', '61000']\n['104', 'Pooja Gupta', '75000']" },
{ id: 29, cat: "python", title: "Reverse a String and Check Palindrome Using Stack", q: "Write a Python program that uses a stack to reverse a given string and then checks whether the string is a palindrome.", code: "def reverse_string(s):\n    stack = []\n    for ch in s:\n        stack.append(ch)\n    rev = \"\"\n    while stack:\n        rev += stack.pop()\n    return rev\n\nfor word in [\"computer\", \"malayalam\", \"CBSE\"]:\n    r = reverse_string(word)\n    print(word, \"-> reversed:\", r, \"|\", \"Palindrome\" if word == r else \"Not a palindrome\")", output: "computer -> reversed: retupmoc | Not a palindrome\nmalayalam -> reversed: malayalam | Palindrome\nCBSE -> reversed: ESBC | Not a palindrome" },
{ id: 30, cat: "python", title: "Delete Records and Show Class-wise Count", q: "The table STUDENT(ROLLNO, NAME, CLASS, MARKS) in the database SCHOOL contains these records: (1, Aarav, XII-A, 88), (2, Diya, XII-A, 92), (3, Kabir, XII-B, 67), (4, Isha, XII-B, 74), (5, Rohan, XII-A, 81). Write a Python program to delete the record of the student whose roll number is entered by the user, and then display the number of students in each class using GROUP BY.", code: "import mysql.connector as sqltor\n\ncon = sqltor.connect(host=\"localhost\", user=\"root\", passwd=\"root\", database=\"SCHOOL\")\ncur = con.cursor()\nr = int(input(\"Enter roll number to delete: \"))\ncur.execute(\"DELETE FROM STUDENT WHERE ROLLNO = %s\", (r,))\ncon.commit()\nprint(cur.rowcount, \"record deleted.\")\ncur.execute(\"SELECT CLASS, COUNT(*) FROM STUDENT GROUP BY CLASS ORDER BY CLASS\")\nfor cls, n in cur.fetchall():\n    print(\"Class\", cls, \":\", n, \"student(s)\")\ncon.close()", output: "Enter roll number to delete: 3\n1 record deleted.\nClass XII-A : 3 student(s)\nClass XII-B : 1 student(s)" },
{ id: 31, cat: "python", title: "Variable Length Arguments (*args and **kwargs)", q: "Write a function Stats(*nums) that accepts any number of numeric arguments and returns their minimum, maximum and average. Also write a function Profile(**details) that accepts keyword arguments and displays them as key-value pairs.", code: "def Stats(*nums):\n    return min(nums), max(nums), sum(nums) / len(nums)\n\ndef Profile(**details):\n    for key, value in details.items():\n        print(f\"{key:<8}: {value}\")\n\nlo, hi, avg = Stats(45, 78, 23, 91, 66)\nprint(\"Minimum :\", lo)\nprint(\"Maximum :\", hi)\nprint(\"Average :\", avg)\nprint()\nProfile(name=\"Aarav\", roll=12, section=\"A\", subject=\"Computer Science\")", output: "Minimum : 23\nMaximum : 91\nAverage : 60.6\n\nname    : Aarav\nroll    : 12\nsection : A\nsubject : Computer Science" },
{ id: 32, cat: "python", title: "Longest Word and Longest Line in a File", q: "Write a Python program to read the file STORY.TXT and display the longest word and the longest line present in it along with their lengths.", code: "lines = [\n    \"The sun rose over the hills.\\n\",\n    \"A little bird sang in the old tree.\\n\",\n    \"India is a land of many languages.\\n\",\n    \"The children played in the park.\\n\",\n    \"Technology is changing the way we learn.\\n\",\n    \"She sells sea shells by the sea shore.\\n\",\n    \"To succeed, one must work with focus.\\n\"\n]\nwith open(\"STORY.TXT\", \"w\") as f:\n    f.writelines(lines)\n\nlongest_word = \"\"\nlongest_line = \"\"\nwith open(\"STORY.TXT\", \"r\") as f:\n    for line in f:\n        line = line.rstrip(\"\\n\")\n        if len(line) > len(longest_line):\n            longest_line = line\n        for w in line.split():\n            w = w.strip(\".,\")\n            if len(w) > len(longest_word):\n                longest_word = w\nprint(\"Longest word :\", longest_word, \"(\", len(longest_word), \"characters )\")\nprint(\"Longest line :\", longest_line, \"(\", len(longest_line), \"characters )\")", output: "Longest word : Technology ( 10 characters )\nLongest line : Technology is changing the way we learn. ( 40 characters )" },
{ id: 33, cat: "python", title: "Binary File of Employee Dictionaries", q: "A binary file EMP.DAT stores each employee as a dictionary with keys 'ecode', 'name' and 'salary'. Write a program to display the employees having salary above 50000 and also display the total salary of all employees.", code: "import pickle\n\nemps = [{\"ecode\": 101, \"name\": \"Rahul Sharma\", \"salary\": 52000},\n        {\"ecode\": 102, \"name\": \"Neha Verma\", \"salary\": 61000},\n        {\"ecode\": 103, \"name\": \"Amit Singh\", \"salary\": 45000},\n        {\"ecode\": 104, \"name\": \"Pooja Gupta\", \"salary\": 75000}]\nwith open(\"EMP.DAT\", \"wb\") as f:\n    for e in emps:\n        pickle.dump(e, f)\n\ntotal = 0\nprint(\"Employees with salary above 50000:\")\nwith open(\"EMP.DAT\", \"rb\") as f:\n    try:\n        while True:\n            e = pickle.load(f)\n            total += e[\"salary\"]\n            if e[\"salary\"] > 50000:\n                print(e[\"ecode\"], e[\"name\"], e[\"salary\"])\n    except EOFError:\n        pass\nprint(\"Total salary of all employees:\", total)", output: "Employees with salary above 50000:\n101 Rahul Sharma 52000\n102 Neha Verma 61000\n104 Pooja Gupta 75000\nTotal salary of all employees: 233000" },
{ id: 34, cat: "python", title: "Class-wise Average Marks Using DictReader", q: "The CSV file MARKS.CSV has the columns Name, Class and Marks. Using csv.DictReader, write a program to calculate and display the average marks of each class.", code: "import csv\n\nwith open(\"MARKS.CSV\", \"w\", newline=\"\") as f:\n    csv.writer(f).writerows([[\"Name\", \"Class\", \"Marks\"], [\"Aarav\", \"XII-A\", 88], [\"Diya\", \"XII-A\", 92],\n        [\"Kabir\", \"XII-B\", 67], [\"Isha\", \"XII-B\", 74], [\"Rohan\", \"XII-A\", 81], [\"Tanya\", \"XII-B\", 79]])\n\ntotal, count = {}, {}\nwith open(\"MARKS.CSV\", \"r\") as f:\n    for row in csv.DictReader(f):\n        c = row[\"Class\"]\n        total[c] = total.get(c, 0) + int(row[\"Marks\"])\n        count[c] = count.get(c, 0) + 1\n\nfor c in sorted(total):\n    print(f\"Class {c}: students = {count[c]}, average = {total[c] / count[c]:.2f}\")", output: "Class XII-A: students = 3, average = 87.00\nClass XII-B: students = 3, average = 73.33" },
{ id: 35, cat: "python", title: "Balanced Brackets Using Stack", q: "Write a Python function to check whether the brackets (), [] and {} in an arithmetic expression are balanced, using a stack. Test it with different expressions.", code: "def balanced(expr):\n    stack = []\n    pairs = {\")\": \"(\", \"]\": \"[\", \"}\": \"{\"}\n    for ch in expr:\n        if ch in \"([{\":\n            stack.append(ch)\n        elif ch in \")]}\":\n            if not stack or stack.pop() != pairs[ch]:\n                return False\n    return len(stack) == 0\n\nfor e in [\"(a+b)*[c-d]\", \"{[(a+b)*c]-d}\", \"(a+b]*c\", \"((a+b)\"]:\n    print(f\"{e:<16}\", \"Balanced\" if balanced(e) else \"Not balanced\")", output: "(a+b)*[c-d]      Balanced\n{[(a+b)*c]-d}    Balanced\n(a+b]*c          Not balanced\n((a+b)           Not balanced" },
{ id: 36, cat: "python", title: "Mutable and Immutable Arguments in Functions", q: "Write a Python program to show the difference between passing a mutable object (list) and an immutable object (integer, string) to a function. Display the values before and after the function call.", code: "def change(num, text, items):\n    num = num + 10\n    text = text + \" XII\"\n    items.append(99)\n    items[0] = \"changed\"\n    print(\"Inside function :\", num, text, items)\n\nn = 5\ns = \"Class\"\nlst = [1, 2, 3]\nprint(\"Before call      :\", n, s, lst)\nchange(n, s, lst)\nprint(\"After call       :\", n, s, lst)", output: "Before call      : 5 Class [1, 2, 3]\nInside function : 15 Class XII ['changed', 2, 3, 99]\nAfter call       : 5 Class ['changed', 2, 3, 99]" },
{ id: 37, cat: "python", title: "Word Frequency in a Text File Using Dictionary", q: "Write a Python program to read the file STORY.TXT and create a dictionary that stores the frequency of each word (case-insensitive). Display the words that occur more than once and the most frequent word.", code: "lines = [\n    \"The sun rose over the hills.\\n\",\n    \"A little bird sang in the old tree.\\n\",\n    \"India is a land of many languages.\\n\",\n    \"The children played in the park.\\n\",\n    \"Technology is changing the way we learn.\\n\",\n    \"She sells sea shells by the sea shore.\\n\",\n    \"To succeed, one must work with focus.\\n\"\n]\nwith open(\"STORY.TXT\", \"w\") as f:\n    f.writelines(lines)\n\nfreq = {}\nwith open(\"STORY.TXT\", \"r\") as f:\n    for line in f:\n        for w in line.split():\n            w = w.strip(\".,\").lower()\n            freq[w] = freq.get(w, 0) + 1\n\nprint(\"Words occurring more than once:\")\nfor w, c in freq.items():\n    if c > 1:\n        print(f\"  {w:<6} -> {c}\")\ntop = max(freq, key=freq.get)\nprint(\"Most frequent word:\", top, \"(\", freq[top], \"times )\")", output: "Words occurring more than once:\n  the    -> 7\n  a      -> 2\n  in     -> 2\n  is     -> 2\n  sea    -> 2\nMost frequent word: the ( 7 times )" },
{ id: 38, cat: "python", title: "Copy Records of a Category to Another Binary File", q: "A binary file ITEM.DAT contains records of the form [icode, iname, category, price]. Write a function CopyStationery() that copies all records of the category 'Stationery' into another binary file STAT.DAT and then displays the contents of STAT.DAT.", code: "import pickle\n\nitems = [[1001, \"Notebook\", \"Stationery\", 45], [1003, \"Backpack\", \"Bags\", 850],\n         [1002, \"Gel Pen\", \"Stationery\", 12], [1004, \"Water Bottle\", \"Home\", 199],\n         [1005, \"Geometry Box\", \"Stationery\", 120]]\nwith open(\"ITEM.DAT\", \"wb\") as f:\n    for it in items:\n        pickle.dump(it, f)\n\ndef CopyStationery():\n    n = 0\n    with open(\"ITEM.DAT\", \"rb\") as fin, open(\"STAT.DAT\", \"wb\") as fout:\n        try:\n            while True:\n                rec = pickle.load(fin)\n                if rec[2] == \"Stationery\":\n                    pickle.dump(rec, fout)\n                    n += 1\n        except EOFError:\n            pass\n    print(n, \"records copied.\")\n\nCopyStationery()\nwith open(\"STAT.DAT\", \"rb\") as f:\n    try:\n        while True:\n            print(pickle.load(f))\n    except EOFError:\n        pass", output: "3 records copied.\n[1001, 'Notebook', 'Stationery', 45]\n[1002, 'Gel Pen', 'Stationery', 12]\n[1005, 'Geometry Box', 'Stationery', 120]" },
{ id: 39, cat: "python", title: "Decimal to Binary Conversion Using Stack", q: "Write a Python program to convert a decimal number into its binary equivalent using a stack.", code: "def to_binary(n):\n    stack = []\n    while n > 0:\n        stack.append(n % 2)\n        n //= 2\n    binary = \"\"\n    while stack:\n        binary += str(stack.pop())\n    return binary\n\nfor num in [10, 25, 64, 255]:\n    print(num, \"in binary =\", to_binary(num))", output: "10 in binary = 1010\n25 in binary = 11001\n64 in binary = 1000000\n255 in binary = 11111111" },
{ id: 40, cat: "python", title: "Row-wise and Column-wise Sum of a Matrix", q: "Write a function MatrixSum(M) that accepts a nested list representing a matrix and displays the sum of every row and every column. Also return the sum of the principal diagonal.", code: "def MatrixSum(M):\n    rows, cols = len(M), len(M[0])\n    for i in range(rows):\n        print(\"Sum of row\", i + 1, \"=\", sum(M[i]))\n    for j in range(cols):\n        print(\"Sum of column\", j + 1, \"=\", sum(M[i][j] for i in range(rows)))\n    return sum(M[i][i] for i in range(min(rows, cols)))\n\nmatrix = [[4, 7, 1],\n          [3, 9, 6],\n          [8, 2, 5]]\nd = MatrixSum(matrix)\nprint(\"Sum of principal diagonal =\", d)", output: "Sum of row 1 = 12\nSum of row 2 = 18\nSum of row 3 = 15\nSum of column 1 = 15\nSum of column 2 = 18\nSum of column 3 = 12\nSum of principal diagonal = 18" },
{ id: 41, cat: "python", title: "seek() and tell() in a Text File", q: "Write a Python program to demonstrate the use of tell() and seek() with the file STORY.TXT. Read the first 20 characters, display the current file position, move to the beginning of the 3rd line and read that line.", code: "lines = [\n    \"The sun rose over the hills.\\n\",\n    \"A little bird sang in the old tree.\\n\",\n    \"India is a land of many languages.\\n\",\n    \"The children played in the park.\\n\",\n    \"Technology is changing the way we learn.\\n\",\n    \"She sells sea shells by the sea shore.\\n\",\n    \"To succeed, one must work with focus.\\n\"\n]\nwith open(\"STORY.TXT\", \"w\") as f:\n    f.writelines(lines)\n\nwith open(\"STORY.TXT\", \"r\") as f:\n    first = f.read(20)\n    print(\"First 20 characters:\", repr(first))\n    print(\"Current position   :\", f.tell())\n    f.seek(0)\n    f.readline()\n    f.readline()\n    pos = f.tell()\n    print(\"Start of 3rd line  :\", pos)\n    print(\"3rd line           :\", f.readline().rstrip())\n    f.seek(0, 2)\n    print(\"Size of file (bytes):\", f.tell())", output: "First 20 characters: 'The sun rose over th'\nCurrent position   : 20\nStart of 3rd line  : 65\n3rd line           : India is a land of many languages.\nSize of file (bytes): 251" },
{ id: 42, cat: "python", title: "Frequency of Elements and Unique List", q: "Write a function Freq(L) that accepts a list and returns a dictionary containing each distinct element along with its frequency. Using this dictionary, display the elements that occur more than once and the list of unique elements in sorted order.", code: "def Freq(L):\n    d = {}\n    for x in L:\n        d[x] = d.get(x, 0) + 1\n    return d\n\ndata = [12, 7, 12, 5, 7, 9, 12, 5, 3]\nf = Freq(data)\nprint(\"Frequency  :\", f)\nrep = [k for k in f if f[k] > 1]\nprint(\"Repeated   :\", rep)\nprint(\"Unique list:\", sorted(f.keys()))", output: "Frequency  : {12: 3, 7: 2, 5: 2, 9: 1, 3: 1}\nRepeated   : [12, 7, 5]\nUnique list: [3, 5, 7, 9, 12]" },
{ id: 43, cat: "python", title: "Convert File Content to Uppercase in a New File", q: "Write a function Upper_Copy() that reads the file STORY.TXT, converts every line to uppercase and stores it in a new file UPPER.TXT. Display the number of lines written and the contents of the new file.", code: "lines = [\n    \"The sun rose over the hills.\\n\",\n    \"A little bird sang in the old tree.\\n\",\n    \"India is a land of many languages.\\n\",\n    \"The children played in the park.\\n\",\n    \"Technology is changing the way we learn.\\n\",\n    \"She sells sea shells by the sea shore.\\n\",\n    \"To succeed, one must work with focus.\\n\"\n]\nwith open(\"STORY.TXT\", \"w\") as f:\n    f.writelines(lines)\n\ndef Upper_Copy():\n    n = 0\n    with open(\"STORY.TXT\", \"r\") as src, open(\"UPPER.TXT\", \"w\") as dst:\n        for line in src:\n            dst.write(line.upper())\n            n += 1\n    return n\n\nprint(\"Lines written:\", Upper_Copy())\nwith open(\"UPPER.TXT\", \"r\") as f:\n    print(f.read())", output: "Lines written: 7\nTHE SUN ROSE OVER THE HILLS.\nA LITTLE BIRD SANG IN THE OLD TREE.\nINDIA IS A LAND OF MANY LANGUAGES.\nTHE CHILDREN PLAYED IN THE PARK.\nTECHNOLOGY IS CHANGING THE WAY WE LEARN.\nSHE SELLS SEA SHELLS BY THE SEA SHORE.\nTO SUCCEED, ONE MUST WORK WITH FOCUS." },
{ id: 44, cat: "python", title: "Display Words Longer Than n Characters", q: "Write a function LongWords(S, n) that accepts a sentence and an integer n, and returns a list of all words having more than n characters. Also display the count of such words and convert them to uppercase.", code: "def LongWords(S, n):\n    result = []\n    for w in S.split():\n        w = w.strip(\".,;!?\")\n        if len(w) > n:\n            result.append(w)\n    return result\n\nsentence = \"Artificial Intelligence and Computer Science are shaping the future of education.\"\nres = LongWords(sentence, 6)\nprint(\"Words longer than 6 characters:\", res)\nprint(\"Count :\", len(res))\nprint(\"Upper :\", [w.upper() for w in res])", output: "Words longer than 6 characters: ['Artificial', 'Intelligence', 'Computer', 'Science', 'shaping', 'education']\nCount : 6\nUpper : ['ARTIFICIAL', 'INTELLIGENCE', 'COMPUTER', 'SCIENCE', 'SHAPING', 'EDUCATION']" },
{ id: 45, cat: "python", title: "Append Records to a Text File and Display", q: "Write a Python program to append three student records (roll number, name and marks) to a text file RESULT.TXT, one record per line, and then display the entire file with line numbers using readlines().", code: "with open(\"RESULT.TXT\", \"w\") as f:\n    f.write(\"101,Aarav,88\\n\")\n\nwith open(\"RESULT.TXT\", \"a\") as f:\n    f.write(\"102,Diya,92\\n\")\n    f.write(\"103,Kabir,79\\n\")\n    f.write(\"104,Isha,85\\n\")\n\nwith open(\"RESULT.TXT\", \"r\") as f:\n    lines = f.readlines()\nfor i, line in enumerate(lines, 1):\n    r, n, m = line.strip().split(\",\")\n    print(f\"{i}. Roll: {r}  Name: {n:<6} Marks: {m}\")\nprint(\"Total records:\", len(lines))", output: "1. Roll: 101  Name: Aarav  Marks: 88\n2. Roll: 102  Name: Diya   Marks: 92\n3. Roll: 103  Name: Kabir  Marks: 79\n4. Roll: 104  Name: Isha   Marks: 85\nTotal records: 4" },
{ id: 46, cat: "python", title: "Recursion: Sum of Digits, Power and Palindrome", q: "Write recursive functions to (i) find the sum of the digits of a number, (ii) calculate x raised to the power n and (iii) check whether a string is a palindrome. Test each function with suitable values.", code: "def digit_sum(n):\n    if n == 0:\n        return 0\n    return n % 10 + digit_sum(n // 10)\n\ndef power(x, n):\n    if n == 0:\n        return 1\n    return x * power(x, n - 1)\n\ndef is_pal(s):\n    if len(s) <= 1:\n        return True\n    if s[0] != s[-1]:\n        return False\n    return is_pal(s[1:-1])\n\nprint(\"Sum of digits of 98765 :\", digit_sum(98765))\nprint(\"2 raised to power 10   :\", power(2, 10))\nfor w in [\"level\", \"computer\", \"madam\"]:\n    print(w, \"->\", \"Palindrome\" if is_pal(w) else \"Not a palindrome\")", output: "Sum of digits of 98765 : 35\n2 raised to power 10   : 1024\nlevel -> Palindrome\ncomputer -> Not a palindrome\nmadam -> Palindrome" },
  {
    "id": 47,
    "cat": "sql",
    "title": "Selection with WHERE, ORDER BY and LIKE",
    "q": "Consider the tables EMPLOYEE(ECODE, ENAME, GENDER, DEPTNO, SALARY, DOJ). Write SQL statements for the following and show the output:\n(i) Display all details of the employees of department 20 in descending order of salary.\n(ii) Display the name and salary of employees whose salary is between 45000 and 60000.\n(iii) Display the names of employees whose name ends with the letter 'a'.",
    "code": "-- (i)\nSELECT * FROM EMPLOYEE WHERE DEPTNO = 20 ORDER BY SALARY DESC;\n\n-- (ii)\nSELECT ENAME, SALARY FROM EMPLOYEE WHERE SALARY BETWEEN 45000 AND 60000;\n\n-- (iii)\nSELECT ENAME FROM EMPLOYEE WHERE ENAME LIKE '%a';",
    "output": "(i)\n+-------+------------+--------+--------+--------+------------+\n| ECODE | ENAME      | GENDER | DEPTNO | SALARY | DOJ        |\n+-------+------------+--------+--------+--------+------------+\n|   102 | Neha Verma | F      |     20 |  61000 | 2016-07-01 |\n|   108 | Divya Nair | F      |     20 |  58000 | 2022-04-18 |\n|   103 | Amit Singh | M      |     20 |  45000 | 2020-01-15 |\n+-------+------------+--------+--------+--------+------------+\n\n(ii)\n+--------------+--------+\n| ENAME        | SALARY |\n+--------------+--------+\n| Rahul Sharma |  52000 |\n| Amit Singh   |  45000 |\n| Imran Khan   |  47000 |\n| Divya Nair   |  58000 |\n+--------------+--------+\n\n(iii)\n+--------------+\n| ENAME        |\n+--------------+\n| Rahul Sharma |\n| Neha Verma   |\n| Pooja Gupta  |\n| Karan Mehta  |\n+--------------+"
  },
  {
    "id": 48,
    "cat": "sql",
    "title": "Single-Row Functions on ITEM",
    "q": "Consider the tables ITEM(ICODE, INAME, CATEGORY, PRICE, STOCK). Write SQL statements for the following and show the output:\n(i) Display the name and price of Stationery items after a 10% discount, rounded to 1 decimal place.\n(ii) Display the item names in uppercase along with the length of each name.\n(iii) Display the first 3 letters, last 2 letters and 3 letters from the 2nd position of the name of items having code below 1004.",
    "code": "-- (i)\nSELECT INAME, PRICE, ROUND(PRICE * 0.9, 1) FROM ITEM WHERE CATEGORY = 'Stationery';\n\n-- (ii)\nSELECT UPPER(INAME), LENGTH(INAME) FROM ITEM;\n\n-- (iii)\nSELECT INAME, LEFT(INAME, 3), RIGHT(INAME, 2), MID(INAME, 2, 3) FROM ITEM WHERE ICODE < 1004;",
    "output": "(i)\n+--------------+-------+-----------------------+\n| INAME        | PRICE | ROUND(PRICE * 0.9, 1) |\n+--------------+-------+-----------------------+\n| Notebook     |    45 |                  40.5 |\n| Gel Pen      |    12 |                  10.8 |\n| Geometry Box |   120 |                 108.0 |\n| Eraser Pack  |    30 |                  27.0 |\n+--------------+-------+-----------------------+\n\n(ii)\n+--------------+---------------+\n| UPPER(INAME) | LENGTH(INAME) |\n+--------------+---------------+\n| NOTEBOOK     |             8 |\n| GEL PEN      |             7 |\n| BACKPACK     |             8 |\n| WATER BOTTLE |            12 |\n| GEOMETRY BOX |            12 |\n| LUNCH BOX    |             9 |\n| ERASER PACK  |            11 |\n+--------------+---------------+\n\n(iii)\n+----------+----------------+-----------------+------------------+\n| INAME    | LEFT(INAME, 3) | RIGHT(INAME, 2) | MID(INAME, 2, 3) |\n+----------+----------------+-----------------+------------------+\n| Notebook | Not            | ok              | ote              |\n| Gel Pen  | Gel            | en              | el               |\n| Backpack | Bac            | ck              | ack              |\n+----------+----------------+-----------------+------------------+"
  },
  {
    "id": 49,
    "cat": "sql",
    "title": "Joins on STUDENT, MARKS and SUBJECT",
    "q": "Consider the tables STUDENT(ADMNO, SNAME, GENDER, CLASS, SEC); SUBJECT(SCODE, SUBNAME, TEACHER); MARKS(ADMNO, SCODE, MARKS). Write SQL statements for the following and show the output:\n(i) Display the student name, subject name and marks of the students of section A.\n(ii) Display the names of students who scored more than 80 in Computer Science.\n(iii) Display the student name, subject, teacher and marks for all entries with marks below 33.",
    "code": "-- (i)\nSELECT S.SNAME, SB.SUBNAME, M.MARKS FROM STUDENT S JOIN MARKS M ON S.ADMNO = M.ADMNO JOIN SUBJECT SB ON M.SCODE = SB.SCODE WHERE S.SEC = 'A' ORDER BY S.ADMNO, SB.SUBNAME;\n\n-- (ii)\nSELECT S.SNAME, M.MARKS FROM STUDENT S JOIN MARKS M ON S.ADMNO = M.ADMNO JOIN SUBJECT SB ON M.SCODE = SB.SCODE WHERE SB.SUBNAME = 'Computer Science' AND M.MARKS > 80 ORDER BY M.MARKS DESC;\n\n-- (iii)\nSELECT S.SNAME, SB.SUBNAME, SB.TEACHER, M.MARKS FROM STUDENT S JOIN MARKS M ON S.ADMNO = M.ADMNO JOIN SUBJECT SB ON M.SCODE = SB.SCODE WHERE M.MARKS < 33;",
    "output": "(i)\n+-------+------------------+-------+\n| SNAME | SUBNAME          | MARKS |\n+-------+------------------+-------+\n| Aarav | Computer Science |    88 |\n| Aarav | Mathematics      |    92 |\n| Aarav | Physics          |    79 |\n| Diya  | Computer Science |    92 |\n| Diya  | Mathematics      |    85 |\n| Diya  | Physics          |    90 |\n| Rohan | Computer Science |    81 |\n| Rohan | Mathematics      |    77 |\n| Rohan | Physics          |    88 |\n+-------+------------------+-------+\n\n(ii)\n+-------+-------+\n| SNAME | MARKS |\n+-------+-------+\n| Diya  |    92 |\n| Aarav |    88 |\n| Rohan |    81 |\n+-------+-------+\n\n(iii)\n+-------+---------+----------+-------+\n| SNAME | SUBNAME | TEACHER  | MARKS |\n+-------+---------+----------+-------+\n| Kabir | Physics | Dr. Khan |    30 |\n+-------+---------+----------+-------+"
  },
  {
    "id": 50,
    "cat": "sql",
    "title": "Selection and Aggregates on BOOKS",
    "q": "Consider the tables BOOKS(BNO, TITLE, AUTHOR, PRICE, QTY). Write SQL statements for the following and show the output:\n(i) Display the title and price of books costing between 200 and 500 in ascending order of price.\n(ii) Display the total value of the stock (PRICE x QTY).\n(iii) Display the titles in uppercase along with their length for books having less than 8 copies.",
    "code": "-- (i)\nSELECT TITLE, PRICE FROM BOOKS WHERE PRICE BETWEEN 200 AND 500 ORDER BY PRICE;\n\n-- (ii)\nSELECT SUM(PRICE * QTY) FROM BOOKS;\n\n-- (iii)\nSELECT UPPER(TITLE), LENGTH(TITLE) FROM BOOKS WHERE QTY < 8;",
    "output": "(i)\n+--------------------+-------+\n| TITLE              | PRICE |\n+--------------------+-------+\n| Wings of Fire      |   250 |\n| Discovery of India |   420 |\n+--------------------+-------+\n\n(ii)\n+------------------+\n| SUM(PRICE * QTY) |\n+------------------+\n|            14516 |\n+------------------+\n\n(iii)\n+---------------------+---------------+\n| UPPER(TITLE)        | LENGTH(TITLE) |\n+---------------------+---------------+\n| PYTHON CRASH COURSE |            19 |\n| DISCOVERY OF INDIA  |            18 |\n| LEARN SQL           |             9 |\n+---------------------+---------------+"
  },
  {
    "id": 51,
    "cat": "sql",
    "title": "Joins on DOCTOR, PATIENT and APPOINTMENT",
    "q": "Consider the tables DOCTOR(DID, DNAME, SPECIALITY, FEE); PATIENT(PID, PNAME, AGE, CITY); APPOINTMENT(AID, DID, PID, ADATE). Write SQL statements for the following and show the output:\n(i) Display the patient name, doctor name and appointment date for every appointment.\n(ii) Display each doctor with the number of appointments and the total fee collected.\n(iii) Display the patients of Agra who had more than one appointment.",
    "code": "-- (i)\nSELECT P.PNAME, D.DNAME, A.ADATE FROM APPOINTMENT A JOIN PATIENT P ON A.PID = P.PID JOIN DOCTOR D ON A.DID = D.DID ORDER BY A.AID;\n\n-- (ii)\nSELECT D.DNAME, COUNT(*) AS VISITS, SUM(D.FEE) AS TOTAL_FEE FROM DOCTOR D JOIN APPOINTMENT A ON D.DID = A.DID GROUP BY D.DNAME ORDER BY TOTAL_FEE DESC;\n\n-- (iii)\nSELECT P.PNAME, COUNT(*) FROM PATIENT P JOIN APPOINTMENT A ON P.PID = A.PID WHERE P.CITY = 'Agra' GROUP BY P.PNAME HAVING COUNT(*) > 1 ORDER BY P.PNAME;",
    "output": "(i)\n+--------+------------+------------+\n| PNAME  | DNAME      | ADATE      |\n+--------+------------+------------+\n| Ramesh | Dr. Mehra  | 2025-10-03 |\n| Sunita | Dr. Iyer   | 2025-10-04 |\n| Tarun  | Dr. Pillai | 2025-10-04 |\n| Uma    | Dr. Bose   | 2025-10-09 |\n| Vijay  | Dr. Khan   | 2025-10-12 |\n| Uma    | Dr. Mehra  | 2025-10-15 |\n| Waseem | Dr. Iyer   | 2025-10-18 |\n| Tarun  | Dr. Pillai | 2025-10-21 |\n| Ramesh | Dr. Mehra  | 2025-10-27 |\n+--------+------------+------------+\n\n(ii)\n+------------+--------+-----------+\n| DNAME      | VISITS | TOTAL_FEE |\n+------------+--------+-----------+\n| Dr. Mehra  |      3 |      2400 |\n| Dr. Iyer   |      2 |      1000 |\n| Dr. Bose   |      1 |       900 |\n| Dr. Pillai |      2 |       800 |\n| Dr. Khan   |      1 |       700 |\n+------------+--------+-----------+\n\n(iii)\n+--------+----------+\n| PNAME  | COUNT(*) |\n+--------+----------+\n| Ramesh |        2 |\n| Tarun  |        2 |\n+--------+----------+"
  },
  {
    "id": 52,
    "cat": "sql",
    "title": "Joins on DEPOSITOR and ACCOUNT",
    "q": "Consider the tables DEPOSITOR(HID, HNAME, CITY); ACCOUNT(ACCNO, HID, ACTYPE, BALANCE). Write SQL statements for the following and show the output:\n(i) Display the depositor name, account number, type and balance of all accounts.\n(ii) Display the names of depositors having a balance of more than 50000.\n(iii) Display the average and maximum balance for each account type.",
    "code": "-- (i)\nSELECT D.HNAME, A.ACCNO, A.ACTYPE, A.BALANCE FROM DEPOSITOR D JOIN ACCOUNT A ON D.HID = A.HID ORDER BY A.ACCNO;\n\n-- (ii)\nSELECT D.HNAME, A.BALANCE FROM DEPOSITOR D JOIN ACCOUNT A ON D.HID = A.HID WHERE A.BALANCE > 50000 ORDER BY A.BALANCE DESC;\n\n-- (iii)\nSELECT ACTYPE, AVG(BALANCE), MAX(BALANCE) FROM ACCOUNT GROUP BY ACTYPE ORDER BY ACTYPE;",
    "output": "(i)\n+------------+-------+---------+---------+\n| HNAME      | ACCNO | ACTYPE  | BALANCE |\n+------------+-------+---------+---------+\n| Anita Roy  |  1001 | Savings |   45000 |\n| Vikas Jain |  1002 | Current |  120000 |\n| Meera Iyer |  1003 | Savings |   15000 |\n| Rohit Das  |  1004 | Savings |   82000 |\n| Anita Roy  |  1005 | Current |  250000 |\n| Sana Ali   |  1006 | Savings |    9000 |\n+------------+-------+---------+---------+\n\n(ii)\n+------------+---------+\n| HNAME      | BALANCE |\n+------------+---------+\n| Anita Roy  |  250000 |\n| Vikas Jain |  120000 |\n| Rohit Das  |   82000 |\n+------------+---------+\n\n(iii)\n+---------+--------------+--------------+\n| ACTYPE  | AVG(BALANCE) | MAX(BALANCE) |\n+---------+--------------+--------------+\n| Current |  185000.0000 |       250000 |\n| Savings |   37750.0000 |        82000 |\n+---------+--------------+--------------+"
  },
  {
    "id": 53,
    "cat": "sql",
    "title": "Three-Table Join and Fare Calculation",
    "q": "Consider the tables TRAVELLER(TID, TNAME, CITY); VEHICLE(VCODE, VTYPE, RATE); TRIP(TRIPNO, TID, VCODE, KM, TDATE). Write SQL statements for the following and show the output:\n(i) Display the traveller name, vehicle type and kilometres of every trip.\n(ii) Display the total fare paid by each traveller (where fare = KM x RATE).\n(iii) Display the trips made in an SUV for more than 200 km.",
    "code": "-- (i)\nSELECT T.TNAME, V.VTYPE, R.KM FROM TRIP R JOIN TRAVELLER T ON R.TID = T.TID JOIN VEHICLE V ON R.VCODE = V.VCODE ORDER BY R.TRIPNO;\n\n-- (ii)\nSELECT T.TNAME, SUM(R.KM * V.RATE) AS TOTAL_FARE FROM TRIP R JOIN TRAVELLER T ON R.TID = T.TID JOIN VEHICLE V ON R.VCODE = V.VCODE GROUP BY T.TNAME ORDER BY TOTAL_FARE DESC;\n\n-- (iii)\nSELECT R.TRIPNO, T.TNAME, R.KM FROM TRIP R JOIN TRAVELLER T ON R.TID = T.TID JOIN VEHICLE V ON R.VCODE = V.VCODE WHERE V.VTYPE = 'SUV' AND R.KM > 200;",
    "output": "(i)\n+--------+-----------+-----+\n| TNAME  | VTYPE     | KM  |\n+--------+-----------+-----+\n| Harsh  | Sedan     | 120 |\n| Ishita | SUV       | 300 |\n| Jatin  | Hatchback |  80 |\n| Harsh  | Bus       | 450 |\n| Kavya  | Sedan     |  60 |\n| Lokesh | SUV       | 210 |\n| Jatin  | SUV       | 150 |\n| Kavya  | Hatchback |  95 |\n+--------+-----------+-----+\n\n(ii)\n+--------+------------+\n| TNAME  | TOTAL_FARE |\n+--------+------------+\n| Harsh  |      14940 |\n| Ishita |       5400 |\n| Lokesh |       3780 |\n| Jatin  |       3420 |\n| Kavya  |       1575 |\n+--------+------------+\n\n(iii)\n+--------+--------+-----+\n| TRIPNO | TNAME  | KM  |\n+--------+--------+-----+\n|      2 | Ishita | 300 |\n|      6 | Lokesh | 210 |\n+--------+--------+-----+"
  },
  {
    "id": 54,
    "cat": "sql",
    "title": "Create Tables with Constraints, Insert and DESC",
    "q": "Write SQL statements for the following and show the output:\n(i) Create a table CLUB with MEMBERID (primary key), MNAME (not null), AGE (at least 10) and CITY (default 'Agra').\n(ii) Create a table EVENT with EVENTID (primary key), ETITLE and MEMBERID as a foreign key referencing CLUB.\n(iii) Insert a record for member 3, Chirag, aged 15, from Delhi into the CLUB table.",
    "code": "-- (i)\nCREATE TABLE CLUB (\n  MEMBERID INT PRIMARY KEY,\n  MNAME VARCHAR(25) NOT NULL,\n  AGE INT CHECK (AGE >= 10),\n  CITY VARCHAR(20) DEFAULT 'Agra'\n);\n\n-- (ii)\nCREATE TABLE EVENT (\n  EVENTID INT PRIMARY KEY,\n  ETITLE VARCHAR(30),\n  MEMBERID INT,\n  FOREIGN KEY (MEMBERID) REFERENCES CLUB(MEMBERID)\n);\n\n-- (iii)\nINSERT INTO CLUB VALUES (3, 'Chirag', 15, 'Delhi');",
    "output": "(i)\nQuery OK\n\n(ii)\nQuery OK\n\n(iii)\nQuery OK, 1 row affected"
  },
  {
    "id": 55,
    "cat": "sql",
    "title": "GROUP BY, HAVING and Aggregate Functions",
    "q": "Consider the tables EMPLOYEE(ECODE, ENAME, GENDER, DEPTNO, SALARY, DOJ). Write SQL statements for the following and show the output:\n(i) Display the number of employees and the average salary of each department.\n(ii) Display the highest and lowest salary gender-wise.\n(iii) Display the department numbers having more than 2 employees.",
    "code": "-- (i)\nSELECT DEPTNO, COUNT(*), AVG(SALARY) FROM EMPLOYEE GROUP BY DEPTNO ORDER BY DEPTNO;\n\n-- (ii)\nSELECT GENDER, MAX(SALARY), MIN(SALARY) FROM EMPLOYEE GROUP BY GENDER ORDER BY GENDER;\n\n-- (iii)\nSELECT DEPTNO, COUNT(*) AS TOTAL FROM EMPLOYEE GROUP BY DEPTNO HAVING COUNT(*) > 2;",
    "output": "(i)\n+--------+----------+-------------+\n| DEPTNO | COUNT(*) | AVG(SALARY) |\n+--------+----------+-------------+\n|     10 |        2 |  45500.0000 |\n|     20 |        3 |  54666.6667 |\n|     30 |        2 |  71500.0000 |\n|     40 |        1 |  47000.0000 |\n+--------+----------+-------------+\n\n(ii)\n+--------+-------------+-------------+\n| GENDER | MAX(SALARY) | MIN(SALARY) |\n+--------+-------------+-------------+\n| F      |       75000 |       39000 |\n| M      |       68000 |       45000 |\n+--------+-------------+-------------+\n\n(iii)\n+--------+-------+\n| DEPTNO | TOTAL |\n+--------+-------+\n|     20 |     3 |\n+--------+-------+"
  },
  {
    "id": 56,
    "cat": "sql",
    "title": "Three-Table Join: Sales Report",
    "q": "Consider the tables ITEM(ICODE, INAME, CATEGORY, PRICE, STOCK); CUSTOMER(CID, CNAME, CITY); SALE(SID, ICODE, CID, QTY, SDATE). Write SQL statements for the following and show the output:\n(i) Display the customer name, item name and quantity for every sale.\n(ii) Display the sale id, item name and bill amount (QTY x PRICE) in descending order of amount.\n(iii) Display the total purchase amount of each customer.",
    "code": "-- (i)\nSELECT C.CNAME, I.INAME, S.QTY FROM SALE S JOIN CUSTOMER C ON S.CID = C.CID JOIN ITEM I ON S.ICODE = I.ICODE ORDER BY S.SID;\n\n-- (ii)\nSELECT S.SID, I.INAME, S.QTY * I.PRICE AS AMOUNT FROM SALE S JOIN ITEM I ON S.ICODE = I.ICODE ORDER BY AMOUNT DESC;\n\n-- (iii)\nSELECT C.CNAME, SUM(S.QTY * I.PRICE) AS TOTAL FROM SALE S JOIN CUSTOMER C ON S.CID = C.CID JOIN ITEM I ON S.ICODE = I.ICODE GROUP BY C.CNAME ORDER BY TOTAL DESC;",
    "output": "(i)\n+------------+--------------+-----+\n| CNAME      | INAME        | QTY |\n+------------+--------------+-----+\n| Anita Roy  | Notebook     |  10 |\n| Vikas Jain | Backpack     |   1 |\n| Anita Roy  | Gel Pen      |  25 |\n| Meera Iyer | Water Bottle |   2 |\n| Rohit Das  | Geometry Box |   3 |\n| Sana Ali   | Notebook     |  20 |\n| Vikas Jain | Lunch Box    |   1 |\n| Rohit Das  | Backpack     |   2 |\n| Vikas Jain | Gel Pen      |  30 |\n+------------+--------------+-----+\n\n(ii)\n+-----+--------------+--------+\n| SID | INAME        | AMOUNT |\n+-----+--------------+--------+\n| 508 | Backpack     |   1700 |\n| 506 | Notebook     |    900 |\n| 502 | Backpack     |    850 |\n| 501 | Notebook     |    450 |\n| 504 | Water Bottle |    398 |\n| 505 | Geometry Box |    360 |\n| 509 | Gel Pen      |    360 |\n| 503 | Gel Pen      |    300 |\n| 507 | Lunch Box    |    260 |\n+-----+--------------+--------+\n\n(iii)\n+------------+-------+\n| CNAME      | TOTAL |\n+------------+-------+\n| Rohit Das  |  2060 |\n| Vikas Jain |  1470 |\n| Sana Ali   |   900 |\n| Anita Roy  |   750 |\n| Meera Iyer |   398 |\n+------------+-------+"
  },
  {
    "id": 57,
    "cat": "sql",
    "title": "Subject-wise Aggregate Functions",
    "q": "Consider the tables STUDENT(ADMNO, SNAME, GENDER, CLASS, SEC); SUBJECT(SCODE, SUBNAME, TEACHER); MARKS(ADMNO, SCODE, MARKS). Write SQL statements for the following and show the output:\n(i) Display the average, highest and lowest marks of each subject.\n(ii) Display the section-wise and gender-wise number of students.\n(iii) Display the subjects in which the average marks are more than 75.",
    "code": "-- (i)\nSELECT SB.SUBNAME, AVG(M.MARKS), MAX(M.MARKS), MIN(M.MARKS) FROM SUBJECT SB JOIN MARKS M ON SB.SCODE = M.SCODE GROUP BY SB.SUBNAME ORDER BY SB.SUBNAME;\n\n-- (ii)\nSELECT SEC, GENDER, COUNT(*) FROM STUDENT GROUP BY SEC, GENDER ORDER BY SEC, GENDER;\n\n-- (iii)\nSELECT SB.SUBNAME, AVG(M.MARKS) FROM SUBJECT SB JOIN MARKS M ON SB.SCODE = M.SCODE GROUP BY SB.SUBNAME HAVING AVG(M.MARKS) > 75 ORDER BY SB.SUBNAME;",
    "output": "(i)\n+------------------+--------------+--------------+--------------+\n| SUBNAME          | AVG(M.MARKS) | MAX(M.MARKS) | MIN(M.MARKS) |\n+------------------+--------------+--------------+--------------+\n| Computer Science |      80.1667 |           92 |           67 |\n| Mathematics      |      80.5000 |           92 |           58 |\n| Physics          |      71.3333 |           90 |           30 |\n+------------------+--------------+--------------+--------------+\n\n(ii)\n+-----+--------+----------+\n| SEC | GENDER | COUNT(*) |\n+-----+--------+----------+\n| A   | F      |        1 |\n| A   | M      |        2 |\n| B   | F      |        2 |\n| B   | M      |        1 |\n+-----+--------+----------+\n\n(iii)\n+------------------+--------------+\n| SUBNAME          | AVG(M.MARKS) |\n+------------------+--------------+\n| Computer Science |      80.1667 |\n| Mathematics      |      80.5000 |\n+------------------+--------------+"
  },
  {
    "id": 58,
    "cat": "sql",
    "title": "Three-Table Join: BOOKS, MEMBER and ISSUE",
    "q": "Consider the tables BOOKS(BNO, TITLE, AUTHOR, PRICE, QTY); MEMBER(MID, MNAME, CITY); ISSUE(ISSUEID, BNO, MID, ISSUEDATE, RETURNED). Write SQL statements for the following and show the output:\n(i) Display the member name, book title and issue date for every issue.\n(ii) Display the member names and book titles of the books that have not been returned.\n(iii) Display the number of books issued by each member.",
    "code": "-- (i)\nSELECT M.MNAME, B.TITLE, I.ISSUEDATE FROM ISSUE I JOIN MEMBER M ON I.MID = M.MID JOIN BOOKS B ON I.BNO = B.BNO ORDER BY I.ISSUEID;\n\n-- (ii)\nSELECT M.MNAME, B.TITLE FROM ISSUE I JOIN MEMBER M ON I.MID = M.MID JOIN BOOKS B ON I.BNO = B.BNO WHERE I.RETURNED = 'N' ORDER BY M.MNAME;\n\n-- (iii)\nSELECT M.MNAME, COUNT(*) AS BOOKS_ISSUED FROM MEMBER M JOIN ISSUE I ON M.MID = I.MID GROUP BY M.MNAME ORDER BY BOOKS_ISSUED DESC, M.MNAME;",
    "output": "(i)\n+-------------+---------------------+------------+\n| MNAME       | TITLE               | ISSUEDATE  |\n+-------------+---------------------+------------+\n| Anil Kumar  | Wings of Fire       | 2025-07-03 |\n| Bhavna Shah | Python Crash Course | 2025-07-10 |\n| Anil Kumar  | Gitanjali           | 2025-07-18 |\n| Chetan Rao  | Learn SQL           | 2025-08-02 |\n| Deepa Nair  | Python Crash Course | 2025-08-09 |\n| Bhavna Shah | Malgudi Days        | 2025-08-21 |\n| Esha Roy    | Wings of Fire       | 2025-09-01 |\n| Chetan Rao  | Discovery of India  | 2025-09-12 |\n+-------------+---------------------+------------+\n\n(ii)\n+-------------+---------------------+\n| MNAME       | TITLE               |\n+-------------+---------------------+\n| Bhavna Shah | Python Crash Course |\n| Bhavna Shah | Malgudi Days        |\n| Chetan Rao  | Learn SQL           |\n| Chetan Rao  | Discovery of India  |\n+-------------+---------------------+\n\n(iii)\n+-------------+--------------+\n| MNAME       | BOOKS_ISSUED |\n+-------------+--------------+\n| Anil Kumar  |            2 |\n| Bhavna Shah |            2 |\n| Chetan Rao  |            2 |\n| Deepa Nair  |            1 |\n| Esha Roy    |            1 |\n+-------------+--------------+"
  },
  {
    "id": 59,
    "cat": "sql",
    "title": "GROUP BY, ORDER BY and Aggregates on DOCTOR and PATIENT",
    "q": "Consider the tables DOCTOR(DID, DNAME, SPECIALITY, FEE); PATIENT(PID, PNAME, AGE, CITY). Write SQL statements for the following and show the output:\n(i) Display the speciality-wise number of doctors and average fee.\n(ii) Display the name and age of patients older than 40 in descending order of age.\n(iii) Display the city-wise number of patients.",
    "code": "-- (i)\nSELECT SPECIALITY, COUNT(*), AVG(FEE) FROM DOCTOR GROUP BY SPECIALITY ORDER BY SPECIALITY;\n\n-- (ii)\nSELECT PNAME, AGE FROM PATIENT WHERE AGE > 40 ORDER BY AGE DESC;\n\n-- (iii)\nSELECT CITY, COUNT(*) FROM PATIENT GROUP BY CITY ORDER BY COUNT(*) DESC, CITY;",
    "output": "(i)\n+--------------+----------+----------+\n| SPECIALITY   | COUNT(*) | AVG(FEE) |\n+--------------+----------+----------+\n| Cardiology   |        2 | 850.0000 |\n| Dermatology  |        1 | 500.0000 |\n| Orthopaedics |        1 | 700.0000 |\n| Paediatrics  |        1 | 400.0000 |\n+--------------+----------+----------+\n\n(ii)\n+--------+-----+\n| PNAME  | AGE |\n+--------+-----+\n| Uma    |  67 |\n| Ramesh |  54 |\n| Vijay  |  45 |\n+--------+-----+\n\n(iii)\n+---------+----------+\n| CITY    | COUNT(*) |\n+---------+----------+\n| Agra    |        3 |\n| Delhi   |        2 |\n| Mathura |        1 |\n+---------+----------+"
  },
  {
    "id": 60,
    "cat": "sql",
    "title": "Three-Table Join with Transactions",
    "q": "Consider the tables DEPOSITOR(HID, HNAME, CITY); ACCOUNT(ACCNO, HID, ACTYPE, BALANCE); TXN(TID, ACCNO, AMOUNT, TTYPE, TDATE). Write SQL statements for the following and show the output:\n(i) Display the depositor name, account number, amount and type of every transaction.\n(ii) Display the number of transactions and the total amount for each transaction type.\n(iii) Display the transactions of November 2025 in descending order of amount.",
    "code": "-- (i)\nSELECT D.HNAME, T.ACCNO, T.AMOUNT, T.TTYPE FROM TXN T JOIN ACCOUNT A ON T.ACCNO = A.ACCNO JOIN DEPOSITOR D ON A.HID = D.HID ORDER BY T.TID;\n\n-- (ii)\nSELECT TTYPE, COUNT(*), SUM(AMOUNT) FROM TXN GROUP BY TTYPE ORDER BY TTYPE;\n\n-- (iii)\nSELECT TID, ACCNO, AMOUNT FROM TXN WHERE MONTHNAME(TDATE) = 'November' AND YEAR(TDATE) = 2025 ORDER BY AMOUNT DESC;",
    "output": "(i)\n+------------+-------+--------+----------+\n| HNAME      | ACCNO | AMOUNT | TTYPE    |\n+------------+-------+--------+----------+\n| Anita Roy  |  1001 |   5000 | Deposit  |\n| Vikas Jain |  1002 |  20000 | Withdraw |\n| Meera Iyer |  1003 |   2000 | Deposit  |\n| Rohit Das  |  1004 |  10000 | Withdraw |\n| Anita Roy  |  1001 |   3000 | Withdraw |\n| Anita Roy  |  1005 |  50000 | Deposit  |\n| Vikas Jain |  1002 |  15000 | Deposit  |\n| Rohit Das  |  1004 |   5000 | Deposit  |\n+------------+-------+--------+----------+\n\n(ii)\n+----------+----------+-------------+\n| TTYPE    | COUNT(*) | SUM(AMOUNT) |\n+----------+----------+-------------+\n| Deposit  |        5 |       77000 |\n| Withdraw |        3 |       33000 |\n+----------+----------+-------------+\n\n(iii)\n+-----+-------+--------+\n| TID | ACCNO | AMOUNT |\n+-----+-------+--------+\n|   6 |  1005 |  50000 |\n|   2 |  1002 |  20000 |\n|   7 |  1002 |  15000 |\n|   4 |  1004 |  10000 |\n|   1 |  1001 |   5000 |\n|   5 |  1001 |   3000 |\n|   3 |  1003 |   2000 |\n+-----+-------+--------+"
  },
  {
    "id": 61,
    "cat": "sql",
    "title": "Aggregates, Dates and Subqueries on TRAVEL Database",
    "q": "Consider the tables TRAVELLER(TID, TNAME, CITY); VEHICLE(VCODE, VTYPE, RATE); TRIP(TRIPNO, TID, VCODE, KM, TDATE). Write SQL statements for the following and show the output:\n(i) Display the month-wise total kilometres travelled.\n(ii) Display the names of travellers who travelled by Bus.\n(iii) Display the trips whose distance is more than the average distance.",
    "code": "-- (i)\nSELECT MONTHNAME(TDATE), SUM(KM) FROM TRIP GROUP BY MONTH(TDATE), MONTHNAME(TDATE) ORDER BY MONTH(TDATE);\n\n-- (ii)\nSELECT TNAME FROM TRAVELLER WHERE TID IN (SELECT TID FROM TRIP WHERE VCODE = (SELECT VCODE FROM VEHICLE WHERE VTYPE = 'Bus'));\n\n-- (iii)\nSELECT TRIPNO, KM FROM TRIP WHERE KM > (SELECT AVG(KM) FROM TRIP) ORDER BY KM DESC;",
    "output": "(i)\n+------------------+---------+\n| MONTHNAME(TDATE) | SUM(KM) |\n+------------------+---------+\n| March            |     420 |\n| April            |     530 |\n| May              |     270 |\n| June             |     245 |\n+------------------+---------+\n\n(ii)\n+-------+\n| TNAME |\n+-------+\n| Harsh |\n+-------+\n\n(iii)\n+--------+-----+\n| TRIPNO | KM  |\n+--------+-----+\n|      4 | 450 |\n|      2 | 300 |\n|      6 | 210 |\n+--------+-----+"
  },
  {
    "id": 62,
    "cat": "sql",
    "title": "Joins on EMPLOYEE and DEPARTMENT",
    "q": "Consider the tables EMPLOYEE(ECODE, ENAME, GENDER, DEPTNO, SALARY, DOJ); DEPARTMENT(DEPTNO, DNAME, LOCATION). Write SQL statements for the following and show the output:\n(i) Display the employee name along with the department name.\n(ii) Display the names of employees working in departments located in Delhi.\n(iii) Display the department name and the total salary of each department in descending order of total salary.",
    "code": "-- (i)\nSELECT E.ENAME, D.DNAME FROM EMPLOYEE E, DEPARTMENT D WHERE E.DEPTNO = D.DEPTNO ORDER BY E.ECODE;\n\n-- (ii)\nSELECT E.ENAME, D.DNAME FROM EMPLOYEE E JOIN DEPARTMENT D ON E.DEPTNO = D.DEPTNO WHERE D.LOCATION = 'Delhi' ORDER BY E.ENAME;\n\n-- (iii)\nSELECT D.DNAME, SUM(E.SALARY) AS TOTAL_SALARY FROM DEPARTMENT D JOIN EMPLOYEE E ON D.DEPTNO = E.DEPTNO GROUP BY D.DNAME ORDER BY TOTAL_SALARY DESC;",
    "output": "(i)\n+--------------+----------+\n| ENAME        | DNAME    |\n+--------------+----------+\n| Rahul Sharma | Accounts |\n| Neha Verma   | Sales    |\n| Amit Singh   | Sales    |\n| Pooja Gupta  | Research |\n| Karan Mehta  | Research |\n| Sneha Rao    | Accounts |\n| Imran Khan   | HR       |\n| Divya Nair   | Sales    |\n+--------------+----------+\n\n(ii)\n+--------------+----------+\n| ENAME        | DNAME    |\n+--------------+----------+\n| Imran Khan   | HR       |\n| Rahul Sharma | Accounts |\n| Sneha Rao    | Accounts |\n+--------------+----------+\n\n(iii)\n+----------+--------------+\n| DNAME    | TOTAL_SALARY |\n+----------+--------------+\n| Sales    |       164000 |\n| Research |       143000 |\n| Accounts |        91000 |\n| HR       |        47000 |\n+----------+--------------+"
  },
  {
    "id": 63,
    "cat": "sql",
    "title": "Date Functions on the SALE Table",
    "q": "Consider the tables SALE(SID, ICODE, CID, QTY, SDATE). Write SQL statements for the following and show the output:\n(i) Display the sale id, date, month name and day name of every sale.\n(ii) Display the month-wise number of sales.\n(iii) Display the sales made between 01-04-2025 and 30-04-2025.",
    "code": "-- (i)\nSELECT SID, SDATE, MONTHNAME(SDATE), DAYNAME(SDATE) FROM SALE;\n\n-- (ii)\nSELECT MONTHNAME(SDATE), COUNT(*) FROM SALE GROUP BY MONTH(SDATE), MONTHNAME(SDATE) ORDER BY MONTH(SDATE);\n\n-- (iii)\nSELECT * FROM SALE WHERE SDATE BETWEEN '2025-04-01' AND '2025-04-30';",
    "output": "(i)\n+-----+------------+------------------+----------------+\n| SID | SDATE      | MONTHNAME(SDATE) | DAYNAME(SDATE) |\n+-----+------------+------------------+----------------+\n| 501 | 2025-04-02 | April            | Wednesday      |\n| 502 | 2025-04-05 | April            | Saturday       |\n| 503 | 2025-04-11 | April            | Friday         |\n| 504 | 2025-05-03 | May              | Saturday       |\n| 505 | 2025-05-09 | May              | Friday         |\n| 506 | 2025-05-21 | May              | Wednesday      |\n| 507 | 2025-06-14 | June             | Saturday       |\n| 508 | 2025-06-18 | June             | Wednesday      |\n| 509 | 2025-06-25 | June             | Wednesday      |\n+-----+------------+------------------+----------------+\n\n(ii)\n+------------------+----------+\n| MONTHNAME(SDATE) | COUNT(*) |\n+------------------+----------+\n| April            |        3 |\n| May              |        3 |\n| June             |        3 |\n+------------------+----------+\n\n(iii)\n+-----+-------+-----+-----+------------+\n| SID | ICODE | CID | QTY | SDATE      |\n+-----+-------+-----+-----+------------+\n| 501 |  1001 |   1 |  10 | 2025-04-02 |\n| 502 |  1003 |   2 |   1 | 2025-04-05 |\n| 503 |  1002 |   1 |  25 | 2025-04-11 |\n+-----+-------+-----+-----+------------+"
  },
  {
    "id": 64,
    "cat": "sql",
    "title": "Total and Percentage of Each Student",
    "q": "Consider the tables STUDENT(ADMNO, SNAME, GENDER, CLASS, SEC); SUBJECT(SCODE, SUBNAME, TEACHER); MARKS(ADMNO, SCODE, MARKS). Write SQL statements for the following and show the output:\n(i) Display the admission number, name and total marks of each student in descending order of total.\n(ii) Display the name and percentage of each student (3 subjects of 100 marks each), rounded to 2 decimal places.\n(iii) Display the students whose total marks are more than 240.",
    "code": "-- (i)\nSELECT S.ADMNO, S.SNAME, SUM(M.MARKS) AS TOTAL FROM STUDENT S JOIN MARKS M ON S.ADMNO = M.ADMNO GROUP BY S.ADMNO, S.SNAME ORDER BY TOTAL DESC;\n\n-- (ii)\nSELECT S.SNAME, ROUND(AVG(M.MARKS), 2) FROM STUDENT S JOIN MARKS M ON S.ADMNO = M.ADMNO GROUP BY S.SNAME ORDER BY S.SNAME;\n\n-- (iii)\nSELECT S.SNAME, SUM(M.MARKS) AS TOTAL FROM STUDENT S JOIN MARKS M ON S.ADMNO = M.ADMNO GROUP BY S.SNAME HAVING SUM(M.MARKS) > 240 ORDER BY TOTAL DESC;",
    "output": "(i)\n+-------+-------+-------+\n| ADMNO | SNAME | TOTAL |\n+-------+-------+-------+\n|     2 | Diya  |   267 |\n|     1 | Aarav |   259 |\n|     5 | Rohan |   246 |\n|     6 | Tanya |   241 |\n|     4 | Isha  |   224 |\n|     3 | Kabir |   155 |\n+-------+-------+-------+\n\n(ii)\n+-------+------------------------+\n| SNAME | ROUND(AVG(M.MARKS), 2) |\n+-------+------------------------+\n| Aarav |                  86.33 |\n| Diya  |                  89.00 |\n| Isha  |                  74.67 |\n| Kabir |                  51.67 |\n| Rohan |                  82.00 |\n| Tanya |                  80.33 |\n+-------+------------------------+\n\n(iii)\n+-------+-------+\n| SNAME | TOTAL |\n+-------+-------+\n| Diya  |   267 |\n| Aarav |   259 |\n| Rohan |   246 |\n| Tanya |   241 |\n+-------+-------+"
  },
  {
    "id": 65,
    "cat": "sql",
    "title": "Date Functions and GROUP BY on ISSUE",
    "q": "Consider the tables BOOKS(BNO, TITLE, AUTHOR, PRICE, QTY); ISSUE(ISSUEID, BNO, MID, ISSUEDATE, RETURNED). Write SQL statements for the following and show the output:\n(i) Display the issue id, issue date, month name and year of every issue.\n(ii) Display the month-wise number of books issued.\n(iii) Display the three most frequently issued books.",
    "code": "-- (i)\nSELECT ISSUEID, ISSUEDATE, MONTHNAME(ISSUEDATE), YEAR(ISSUEDATE) FROM ISSUE;\n\n-- (ii)\nSELECT MONTHNAME(ISSUEDATE), COUNT(*) FROM ISSUE GROUP BY MONTH(ISSUEDATE), MONTHNAME(ISSUEDATE) ORDER BY MONTH(ISSUEDATE);\n\n-- (iii)\nSELECT B.TITLE, COUNT(*) FROM BOOKS B JOIN ISSUE I ON B.BNO = I.BNO GROUP BY B.TITLE ORDER BY COUNT(*) DESC, B.TITLE LIMIT 3;",
    "output": "(i)\n+---------+------------+----------------------+-----------------+\n| ISSUEID | ISSUEDATE  | MONTHNAME(ISSUEDATE) | YEAR(ISSUEDATE) |\n+---------+------------+----------------------+-----------------+\n|       1 | 2025-07-03 | July                 |            2025 |\n|       2 | 2025-07-10 | July                 |            2025 |\n|       3 | 2025-07-18 | July                 |            2025 |\n|       4 | 2025-08-02 | August               |            2025 |\n|       5 | 2025-08-09 | August               |            2025 |\n|       6 | 2025-08-21 | August               |            2025 |\n|       7 | 2025-09-01 | September            |            2025 |\n|       8 | 2025-09-12 | September            |            2025 |\n+---------+------------+----------------------+-----------------+\n\n(ii)\n+----------------------+----------+\n| MONTHNAME(ISSUEDATE) | COUNT(*) |\n+----------------------+----------+\n| July                 |        3 |\n| August               |        3 |\n| September            |        2 |\n+----------------------+----------+\n\n(iii)\n+---------------------+----------+\n| TITLE               | COUNT(*) |\n+---------------------+----------+\n| Python Crash Course |        2 |\n| Wings of Fire       |        2 |\n| Discovery of India  |        1 |\n+---------------------+----------+"
  },
  {
    "id": 66,
    "cat": "sql",
    "title": "Subqueries on DOCTOR, PATIENT and APPOINTMENT",
    "q": "Consider the tables DOCTOR(DID, DNAME, SPECIALITY, FEE); PATIENT(PID, PNAME, AGE, CITY); APPOINTMENT(AID, DID, PID, ADATE). Write SQL statements for the following and show the output:\n(i) Display the names of doctors whose fee is more than the average fee.\n(ii) Display the names of patients treated by Dr. Mehra.\n(iii) Display the name of the doctor charging the highest fee.",
    "code": "-- (i)\nSELECT DNAME, FEE FROM DOCTOR WHERE FEE > (SELECT AVG(FEE) FROM DOCTOR) ORDER BY FEE;\n\n-- (ii)\nSELECT DISTINCT PNAME FROM PATIENT WHERE PID IN (SELECT PID FROM APPOINTMENT WHERE DID = (SELECT DID FROM DOCTOR WHERE DNAME = 'Dr. Mehra')) ORDER BY PNAME;\n\n-- (iii)\nSELECT DNAME FROM DOCTOR WHERE FEE = (SELECT MAX(FEE) FROM DOCTOR);",
    "output": "(i)\n+-----------+-----+\n| DNAME     | FEE |\n+-----------+-----+\n| Dr. Khan  | 700 |\n| Dr. Mehra | 800 |\n| Dr. Bose  | 900 |\n+-----------+-----+\n\n(ii)\n+--------+\n| PNAME  |\n+--------+\n| Ramesh |\n| Uma    |\n+--------+\n\n(iii)\n+----------+\n| DNAME    |\n+----------+\n| Dr. Bose |\n+----------+"
  },
  {
    "id": 67,
    "cat": "sql",
    "title": "UPDATE, INSERT and DELETE on ACCOUNT",
    "q": "Consider the tables DEPOSITOR(HID, HNAME, CITY); ACCOUNT(ACCNO, HID, ACTYPE, BALANCE). Write SQL statements for the following and show the output:\n(i) Add Rs. 2000 as interest to all Savings accounts having a balance below 20000.\n(ii) Open a new Current account 1007 for depositor 3 with an opening balance of 30000.\n(iii) Close the account having account number 1006.",
    "code": "-- (i)\nUPDATE ACCOUNT SET BALANCE = BALANCE + 2000 WHERE ACTYPE = 'Savings' AND BALANCE < 20000;\n\n-- (ii)\nINSERT INTO ACCOUNT VALUES (1007, 3, 'Current', 30000);\n\n-- (iii)\nDELETE FROM ACCOUNT WHERE ACCNO = 1006;",
    "output": "(i)\nQuery OK, 2 rows affected\n\n(ii)\nQuery OK, 1 row affected\n\n(iii)\nQuery OK, 1 row affected"
  },
  {
    "id": 68,
    "cat": "sql",
    "title": "Three-Table Join: Employees, Departments and Projects",
    "q": "Consider the tables EMPLOYEE(ECODE, ENAME, GENDER, DEPTNO, SALARY, DOJ); DEPARTMENT(DEPTNO, DNAME, LOCATION); PROJECT(PID, PNAME, ECODE, HOURS). Write SQL statements for the following and show the output:\n(i) Display the project name, employee name and department name for every project.\n(ii) Display the employees of the Sales department who worked more than 150 hours on a project.\n(iii) Display the total project hours of each department.",
    "code": "-- (i)\nSELECT P.PNAME, E.ENAME, D.DNAME FROM PROJECT P JOIN EMPLOYEE E ON P.ECODE = E.ECODE JOIN DEPARTMENT D ON E.DEPTNO = D.DEPTNO ORDER BY P.PID;\n\n-- (ii)\nSELECT E.ENAME, P.PNAME, P.HOURS FROM PROJECT P JOIN EMPLOYEE E ON P.ECODE = E.ECODE JOIN DEPARTMENT D ON E.DEPTNO = D.DEPTNO WHERE D.DNAME = 'Sales' AND P.HOURS > 150;\n\n-- (iii)\nSELECT D.DNAME, SUM(P.HOURS) AS TOTAL_HOURS FROM PROJECT P JOIN EMPLOYEE E ON P.ECODE = E.ECODE JOIN DEPARTMENT D ON E.DEPTNO = D.DEPTNO GROUP BY D.DNAME ORDER BY TOTAL_HOURS DESC;",
    "output": "(i)\n+---------+--------------+----------+\n| PNAME   | ENAME        | DNAME    |\n+---------+--------------+----------+\n| Payroll | Rahul Sharma | Accounts |\n| CRM     | Neha Verma   | Sales    |\n| Website | Amit Singh   | Sales    |\n| AI Lab  | Pooja Gupta  | Research |\n| Audit   | Sneha Rao    | Accounts |\n| Chatbot | Karan Mehta  | Research |\n| Recruit | Imran Khan   | HR       |\n+---------+--------------+----------+\n\n(ii)\n+------------+-------+-------+\n| ENAME      | PNAME | HOURS |\n+------------+-------+-------+\n| Neha Verma | CRM   |   200 |\n+------------+-------+-------+\n\n(iii)\n+----------+-------------+\n| DNAME    | TOTAL_HOURS |\n+----------+-------------+\n| Research |         550 |\n| Sales    |         350 |\n| Accounts |         210 |\n| HR       |          80 |\n+----------+-------------+"
  },
  {
    "id": 69,
    "cat": "sql",
    "title": "GROUP BY and HAVING on ITEM, CUSTOMER and SALE",
    "q": "Consider the tables ITEM(ICODE, INAME, CATEGORY, PRICE, STOCK); CUSTOMER(CID, CNAME, CITY); SALE(SID, ICODE, CID, QTY, SDATE). Write SQL statements for the following and show the output:\n(i) Display the number of items and the maximum price in each category.\n(ii) Display the total quantity sold for each item.\n(iii) Display the items whose total quantity sold is more than 25.",
    "code": "-- (i)\nSELECT CATEGORY, COUNT(*), MAX(PRICE) FROM ITEM GROUP BY CATEGORY ORDER BY CATEGORY;\n\n-- (ii)\nSELECT I.INAME, SUM(S.QTY) AS SOLD FROM ITEM I JOIN SALE S ON I.ICODE = S.ICODE GROUP BY I.INAME ORDER BY SOLD DESC;\n\n-- (iii)\nSELECT I.INAME, SUM(S.QTY) AS SOLD FROM ITEM I JOIN SALE S ON I.ICODE = S.ICODE GROUP BY I.INAME HAVING SUM(S.QTY) > 25;",
    "output": "(i)\n+------------+----------+------------+\n| CATEGORY   | COUNT(*) | MAX(PRICE) |\n+------------+----------+------------+\n| Bags       |        1 |        850 |\n| Home       |        2 |        260 |\n| Stationery |        4 |        120 |\n+------------+----------+------------+\n\n(ii)\n+--------------+------+\n| INAME        | SOLD |\n+--------------+------+\n| Gel Pen      |   55 |\n| Notebook     |   30 |\n| Geometry Box |    3 |\n| Backpack     |    3 |\n| Water Bottle |    2 |\n| Lunch Box    |    1 |\n+--------------+------+\n\n(iii)\n+----------+------+\n| INAME    | SOLD |\n+----------+------+\n| Gel Pen  |   55 |\n| Notebook |   30 |\n+----------+------+"
  },
  {
    "id": 70,
    "cat": "sql",
    "title": "Subqueries on STUDENT, SUBJECT and MARKS",
    "q": "Consider the tables STUDENT(ADMNO, SNAME, GENDER, CLASS, SEC); SUBJECT(SCODE, SUBNAME, TEACHER); MARKS(ADMNO, SCODE, MARKS). Write SQL statements for the following and show the output:\n(i) Display the students who scored above the class average in Computer Science (code 83).\n(ii) Display the name of the student who scored the highest marks in Mathematics (code 41).\n(iii) Display the names of students who have failed (marks below 33) in at least one subject.",
    "code": "-- (i)\nSELECT S.SNAME, M.MARKS FROM STUDENT S JOIN MARKS M ON S.ADMNO = M.ADMNO WHERE M.SCODE = 83 AND M.MARKS > (SELECT AVG(MARKS) FROM MARKS WHERE SCODE = 83) ORDER BY S.SNAME;\n\n-- (ii)\nSELECT SNAME FROM STUDENT WHERE ADMNO = (SELECT ADMNO FROM MARKS WHERE SCODE = 41 AND MARKS = (SELECT MAX(MARKS) FROM MARKS WHERE SCODE = 41));\n\n-- (iii)\nSELECT SNAME FROM STUDENT WHERE ADMNO IN (SELECT ADMNO FROM MARKS WHERE MARKS < 33);",
    "output": "(i)\n+-------+-------+\n| SNAME | MARKS |\n+-------+-------+\n| Aarav |    88 |\n| Diya  |    92 |\n| Rohan |    81 |\n+-------+-------+\n\n(ii)\n+-------+\n| SNAME |\n+-------+\n| Aarav |\n+-------+\n\n(iii)\n+-------+\n| SNAME |\n+-------+\n| Kabir |\n+-------+"
  },
  {
    "id": 71,
    "cat": "sql",
    "title": "UPDATE, DELETE and ALTER on BOOKS and ISSUE",
    "q": "Consider the tables BOOKS(BNO, TITLE, AUTHOR, PRICE, QTY); ISSUE(ISSUEID, BNO, MID, ISSUEDATE, RETURNED). Write SQL statements for the following and show the output:\n(i) Increase the price by 50 for all books having less than 6 copies.\n(ii) Delete the records of all books that have been returned in the ISSUE table.\n(iii) Add a column PUBLISHER of type VARCHAR(25) to the BOOKS table.",
    "code": "-- (i)\nUPDATE BOOKS SET PRICE = PRICE + 50 WHERE QTY < 6;\n\n-- (ii)\nDELETE FROM ISSUE WHERE RETURNED = 'Y';\n\n-- (iii)\nALTER TABLE BOOKS ADD PUBLISHER VARCHAR(25);",
    "output": "(i)\nQuery OK, 2 rows affected\n\n(ii)\nQuery OK, 4 rows affected\n\n(iii)\nQuery OK, 0 rows affected"
  },
  {
    "id": 72,
    "cat": "sql",
    "title": "Subqueries on EMPLOYEE and DEPARTMENT",
    "q": "Consider the tables EMPLOYEE(ECODE, ENAME, GENDER, DEPTNO, SALARY, DOJ); DEPARTMENT(DEPTNO, DNAME, LOCATION). Write SQL statements for the following and show the output:\n(i) Display the name and salary of employees who earn more than the average salary.\n(ii) Display the names of employees working in departments located in Delhi.\n(iii) Display the names of departments having an employee who earns more than 70000.",
    "code": "-- (i)\nSELECT ENAME, SALARY FROM EMPLOYEE WHERE SALARY > (SELECT AVG(SALARY) FROM EMPLOYEE);\n\n-- (ii)\nSELECT ENAME FROM EMPLOYEE WHERE DEPTNO IN (SELECT DEPTNO FROM DEPARTMENT WHERE LOCATION = 'Delhi');\n\n-- (iii)\nSELECT DNAME FROM DEPARTMENT WHERE DEPTNO IN (SELECT DEPTNO FROM EMPLOYEE WHERE SALARY > 70000);",
    "output": "(i)\n+-------------+--------+\n| ENAME       | SALARY |\n+-------------+--------+\n| Neha Verma  |  61000 |\n| Pooja Gupta |  75000 |\n| Karan Mehta |  68000 |\n| Divya Nair  |  58000 |\n+-------------+--------+\n\n(ii)\n+--------------+\n| ENAME        |\n+--------------+\n| Rahul Sharma |\n| Sneha Rao    |\n| Imran Khan   |\n+--------------+\n\n(iii)\n+----------+\n| DNAME    |\n+----------+\n| Research |\n+----------+"
  },
  {
    "id": 73,
    "cat": "sql",
    "title": "Subqueries and Unmatched Records",
    "q": "Consider the tables ITEM(ICODE, INAME, CATEGORY, PRICE, STOCK); CUSTOMER(CID, CNAME, CITY); SALE(SID, ICODE, CID, QTY, SDATE). Write SQL statements for the following and show the output:\n(i) Display the names of customers who have not purchased anything.\n(ii) Display the names of items that have never been sold.\n(iii) Display the name and price of items costing more than the average price.",
    "code": "-- (i)\nSELECT CNAME FROM CUSTOMER WHERE CID NOT IN (SELECT CID FROM SALE);\n\n-- (ii)\nSELECT INAME FROM ITEM WHERE ICODE NOT IN (SELECT ICODE FROM SALE);\n\n-- (iii)\nSELECT INAME, PRICE FROM ITEM WHERE PRICE > (SELECT AVG(PRICE) FROM ITEM);",
    "output": "(i)\n+------------+\n| CNAME      |\n+------------+\n| Tarun Bose |\n+------------+\n\n(ii)\n+-------------+\n| INAME       |\n+-------------+\n| Eraser Pack |\n+-------------+\n\n(iii)\n+-----------+-------+\n| INAME     | PRICE |\n+-----------+-------+\n| Backpack  |   850 |\n| Lunch Box |   260 |\n+-----------+-------+"
  },
  {
    "id": 74,
    "cat": "sql",
    "title": "UPDATE, DELETE and ALTER on STUDENT and MARKS",
    "q": "Consider the tables STUDENT(ADMNO, SNAME, GENDER, CLASS, SEC); MARKS(ADMNO, SCODE, MARKS). Write SQL statements for the following and show the output:\n(i) Give 5 grace marks to all entries having marks below 33.\n(ii) Delete all the mark entries of admission number 6.\n(iii) Add a column PHONE of type VARCHAR(10) to the STUDENT table.",
    "code": "-- (i)\nUPDATE MARKS SET MARKS = MARKS + 5 WHERE MARKS < 33;\n\n-- (ii)\nDELETE FROM MARKS WHERE ADMNO = 6;\n\n-- (iii)\nALTER TABLE STUDENT ADD PHONE VARCHAR(10);",
    "output": "(i)\nQuery OK, 1 row affected\n\n(ii)\nQuery OK, 3 rows affected\n\n(iii)\nQuery OK, 0 rows affected"
  },
  {
    "id": 75,
    "cat": "sql",
    "title": "DDL and DML: DESC, ALTER, UPDATE, INSERT and DELETE",
    "q": "Consider the tables EMPLOYEE(ECODE, ENAME, GENDER, DEPTNO, SALARY, DOJ). Write SQL statements for the following and show the output:\n(i) Add a new column EMAIL of type VARCHAR(30) to the table.\n(ii) Increase the salary of all employees of department 10 by 5000.\n(iii) Insert a new record for employee 109, Farah Sheikh, female, department 40, salary 50000, date of joining 05-01-2026.",
    "code": "-- (i)\nALTER TABLE EMPLOYEE ADD EMAIL VARCHAR(30);\n\n-- (ii)\nUPDATE EMPLOYEE SET SALARY = SALARY + 5000 WHERE DEPTNO = 10;\n\n-- (iii)\nINSERT INTO EMPLOYEE (ECODE, ENAME, GENDER, DEPTNO, SALARY, DOJ) VALUES (109, 'Farah Sheikh', 'F', 40, 50000, '2026-01-05');",
    "output": "(i)\nQuery OK, 0 rows affected\n\n(ii)\nQuery OK, 2 rows affected\n\n(iii)\nQuery OK, 1 row affected"
  }
]

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
    const py = pickRandom(presetLibrary.filter(p => p.cat === 'python'), 15);
    const sql = pickRandom(presetLibrary.filter(p => p.cat === 'sql'), 10);
    state.records = [
        ...py.map((p, i) => ({ ...p, title: `Python Practical ${i + 1}: ${p.title}` })),
        ...sql.map((p, i) => ({ ...p, title: `SQL Practical ${i + 1}: ${p.title}` }))
    ].map(p => ({
        type: p.cat, title: p.title, question: p.q,
        code: p.code || "", codeImg: "",
        output: p.output || "", outputImg: "", imgWidthPct: 100
    }));
    saveToLocalStorage();
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
                    <div class="blk-sec"><span class="blk-lbl" style="font-size:${fs - 1}pt">${py ? 'Question / Problem Statement:' : 'Task Objective:'}</span><p class="blk-txt" style="font-size:${fs - 1}pt;white-space:pre-line">${esc(rec.question)}</p></div></div>`;
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

function pickRandom(arr, n) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(0, n);
}

function resetWebsite() {
    const ok = confirm('Reset the whole website?\n\nThis permanently deletes ALL your data from this browser: name and details, records, uploaded screenshots and settings.\n\nThe builder will reload like a brand new visit with a fresh random set of predefined practicals.\n\nThis cannot be undone.');
    if (!ok) return;
    try { localStorage.removeItem('cbse_cs_project_data'); } catch (e) {}
    window.onbeforeunload = null;
    location.reload();
}

document.addEventListener('DOMContentLoaded', function () {
    const printBtn = document.querySelector('header button[onclick="triggerPrint()"]');
    if (!printBtn || document.getElementById('reset-site-btn')) return;
    const btn = document.createElement('button');
    btn.id = 'reset-site-btn';
    btn.type = 'button';
    btn.title = 'Delete all data and start fresh';
    btn.onclick = resetWebsite;
    btn.className = 'bg-[#1a191e] hover:text-rose-300 text-rose-400 font-medium px-3 py-2 rounded-full border border-[rgba(255,255,255,0.06)] flex items-center gap-1 transition';
    btn.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i> Reset Website';
    printBtn.parentNode.insertBefore(btn, printBtn);
});