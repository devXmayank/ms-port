let state = {
    meta: {
        name: "Mayank Sagar",
        roll: "12654321",
        className: "Class XII - Science (A)",
        school: "Public Central School, Agra",
        teacher: "Mrs. Sunita Verma",
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
    { id: 1, cat: "python", title: "Pandas: Create and Inspect a DataFrame", q: "Write a Python program to create a Pandas DataFrame from a dictionary of employee data and display its first 5 rows and the shape of the DataFrame.", code: "import pandas as pd\n\ndata = {\n    'Name': ['Amit', 'Priya', 'Rahul', 'Neha', 'Vikas', 'Anjali'],\n    'Dept': ['HR', 'IT', 'IT', 'Finance', 'Sales', 'HR'],\n    'Salary': [45000, 60000, 75000, 50000, 82000, 48000]\n}\ndf = pd.DataFrame(data)\nprint(df.head())\nprint('Shape:', df.shape)", output: "   Name     Dept  Salary\n0  Amit       HR   45000\n1  Priya     IT   60000\n2  Rahul     IT   75000\n3   Neha  Finance   50000\n4  Vikas   Sales   82000\nShape: (6, 3)" },
    { id: 2, cat: "python", title: "Pandas: Handle Missing Values with dropna()", q: "Write a Python program to remove rows with missing values (NaN) from a DataFrame using dropna().", code: "import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\n    'Product': ['Laptop', 'Mouse', 'Keyboard', 'Monitor'],\n    'Price': [55000, np.nan, 1500, 12000],\n    'Stock': [10, 25, 50, np.nan]\n})\nprint('Original DataFrame:\\n', df)\ndf_cleaned = df.dropna()\nprint('\\nDataFrame after dropna():\\n', df_cleaned)", output: "Original DataFrame:\n    Product    Price  Stock\n0   Laptop  55000.0   10.0\n1    Mouse      NaN   25.0\n2 Keyboard   1500.0   50.0\n3  Monitor  12000.0    NaN\n\nDataFrame after dropna():\n    Product    Price  Stock\n0   Laptop  55000.0   10.0\n2 Keyboard   1500.0   50.0" },
    { id: 3, cat: "python", title: "Pandas: Impute Missing Values with Mean", q: "Write a Python program to fill missing values in the 'Price' column with the mean of the column.", code: "import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\n    'Product': ['Laptop', 'Mouse', 'Keyboard', 'Monitor'],\n    'Price': [55000, np.nan, 1500, 12000]\n})\nmean_price = df['Price'].mean()\ndf['Price'].fillna(mean_price, inplace=True)\nprint(df)", output: "    Product         Price\n0    Laptop  55000.000000\n1     Mouse  22833.333333\n2  Keyboard   1500.000000\n3   Monitor  12000.000000" },
    { id: 4, cat: "python", title: "Pandas: Filter Data with Multiple Conditions", q: "Write a Python program to filter employees in the 'IT' department with a salary greater than 60,000.", code: "import pandas as pd\n\nemp = {\n    'Name': ['Amit', 'Priya', 'Rahul', 'Neha', 'Vikas'],\n    'Dept': ['IT', 'HR', 'IT', 'Finance', 'IT'],\n    'Salary': [45000, 60000, 75000, 50000, 82000]\n}\ndf = pd.DataFrame(emp)\nfiltered_df = df[(df['Dept'] == 'IT') & (df['Salary'] > 60000)]\nprint(filtered_df)", output: "    Name Dept  Salary\n2  Rahul   IT   75000\n4  Vikas   IT   82000" },
    { id: 5, cat: "python", title: "Pandas: Group and Aggregate Data", q: "Write a Python program to group sales data by 'Region' and compute the total sum of 'Revenue' for each region.", code: "import pandas as pd\n\ndata = {'Region': ['North', 'South', 'North', 'East', 'South'], 'Revenue': [2500, 4200, 3100, 1500, 4800]}\ndf = pd.DataFrame(data)\nsummary = df.groupby('Region')['Revenue'].sum()\nprint(summary)", output: "Region\nEast     1500\nNorth    5600\nSouth    9000\nName: Revenue, dtype: int64" },
    { id: 6, cat: "python", title: "Pandas: Sort DataFrame by a Column", q: "Write a Python program to sort a DataFrame by 'Marks' in descending order.", code: "import pandas as pd\n\ndf = pd.DataFrame({'Student': ['A', 'B', 'C'], 'Marks': [78, 92, 85]})\nprint(df.sort_values(by='Marks', ascending=False))", output: "  Student  Marks\n1       B     92\n2       C     85\n0       A     78" },
    { id: 7, cat: "python", title: "Pandas: Create a Series and Filter", q: "Write a Python program to create a Pandas Series and filter values greater than 50.", code: "import pandas as pd\n\ns = pd.Series([10, 55, 20, 85, 40])\nprint(s[s > 50])", output: "1    55\n3    85\ndtype: int64" },
    { id: 8, cat: "python", title: "Pandas: Merge Two DataFrames", q: "Write a Python program to merge two DataFrames on a common key 'ID'.", code: "import pandas as pd\n\ndf1 = pd.DataFrame({'ID': [1, 2], 'Name': ['Aarav', 'Diya']})\ndf2 = pd.DataFrame({'ID': [1, 2], 'Score': [90, 85]})\nmerged = pd.merge(df1, df2, on='ID')\nprint(merged)", output: "   ID   Name  Score\n0   1  Aarav     90\n1   2   Diya     85" },
    { id: 9, cat: "python", title: "Pandas: Add a New Column with a Calculation", q: "Write a Python program to add a new column 'Total' to a DataFrame which is the sum of 'Maths' and 'Science' marks.", code: "import pandas as pd\n\ndf = pd.DataFrame({'Student': ['A', 'B'], 'Maths': [80, 70], 'Science': [90, 85]})\ndf['Total'] = df['Maths'] + df['Science']\nprint(df)", output: "  Student  Maths  Science  Total\n0       A     80       90    170\n1       B     70       85    155" },
    { id: 10, cat: "python", title: "Pandas: Select a Subset of Rows and Columns", q: "Write a Python program to select the first 2 rows and the 'Name' and 'Salary' columns from a DataFrame using .loc or .iloc.", code: "import pandas as pd\n\ndf = pd.DataFrame({\n    'Name': ['Amit', 'Priya', 'Rahul'],\n    'Dept': ['IT', 'HR', 'IT'],\n    'Salary': [45000, 60000, 75000]\n})\nprint(df.loc[0:1, ['Name', 'Salary']])", output: "    Name  Salary\n0   Amit   45000\n1  Priya   60000" },
    { id: 11, cat: "python", title: "Pandas: Pivot Table for Aggregation", q: "Write a Python program to create a pivot table to find the average salary by department and gender.", code: "import pandas as pd\n\ndf = pd.DataFrame({\n    'Dept': ['IT', 'IT', 'HR', 'HR', 'IT'],\n    'Gender': ['M', 'F', 'M', 'F', 'M'],\n    'Salary': [60000, 65000, 50000, 52000, 70000]\n})\npivot = df.pivot_table(values='Salary', index='Dept', columns='Gender', aggfunc='mean')\nprint(pivot)", output: "Gender         F        M\nDept                     \nHR       52000.0  50000.0\nIT       65000.0  65000.0" },
    { id: 12, cat: "python", title: "Pandas: Rename DataFrame Columns", q: "Write a Python program to rename the columns of a DataFrame from 'Name' to 'Full Name' and 'Marks' to 'Score'.", code: "import pandas as pd\n\ndf = pd.DataFrame({'Name': ['A', 'B'], 'Marks': [90, 85]})\ndf.rename(columns={'Name': 'Full Name', 'Marks': 'Score'}, inplace=True)\nprint(df)", output: "  Full Name  Score\n0         A     90\n1         B     85" },
    { id: 13, cat: "python", title: "Pandas: Remove Duplicate Rows", q: "Write a Python program to remove duplicate rows from a DataFrame based on all columns.", code: "import pandas as pd\n\ndf = pd.DataFrame({'A': [1, 2, 1, 3], 'B': ['x', 'y', 'x', 'z']})\ndf_unique = df.drop_duplicates()\nprint(df_unique)", output: "   A  B\n0  1  x\n1  2  y\n3  3  z" },
    { id: 14, cat: "python", title: "Pandas: Concatenate DataFrames Vertically", q: "Write a Python program to concatenate two DataFrames with the same columns vertically using pd.concat().", code: "import pandas as pd\n\ndf1 = pd.DataFrame({'A': [1], 'B': [2]})\ndf2 = pd.DataFrame({'A': [3], 'B': [4]})\nresult = pd.concat([df1, df2], ignore_index=True)\nprint(result)", output: "   A  B\n0  1  2\n1  3  4" },
    { id: 15, cat: "python", title: "Pandas: Save DataFrame to CSV", q: "Write a Python program to create a DataFrame and save it to a CSV file named 'students.csv' without the index.", code: "import pandas as pd\n\ndf = pd.DataFrame({'ID': [1, 2], 'Name': ['A', 'B']})\ndf.to_csv('students.csv', index=False)\nprint('File saved successfully.')", output: "File saved successfully." },
    { id: 16, cat: "python", title: "Pandas: Value Counts of a Categorical Column", q: "Write a Python program to find the frequency of each unique value in the 'City' column.", code: "import pandas as pd\n\ndf = pd.DataFrame({'City': ['Delhi', 'Mumbai', 'Delhi', 'Chennai', 'Mumbai']})\nprint(df['City'].value_counts())", output: "Delhi      2\nMumbai     2\nChennai    1\nName: City, dtype: int64" },
    { id: 17, cat: "python", title: "Matplotlib: Bar Chart for Categorical Data", q: "Write a Python program to plot a bar chart representing the number of students in different streams.", code: "import matplotlib.pyplot as plt\n\nstreams = ['Science', 'Commerce', 'Arts']\nstudents = [120, 90, 75]\n\nplt.bar(streams, students, color='skyblue')\nplt.xlabel('Stream')\nplt.ylabel('Number of Students')\nplt.title('Student Distribution')\nplt.show()", output: "[Chart Output: Bar plot successfully generated.]" },
    { id: 18, cat: "python", title: "Matplotlib: Histogram of a Dataset", q: "Write a Python program to plot a histogram to show the distribution of ages.", code: "import matplotlib.pyplot as plt\n\nages = [18, 22, 25, 21, 19, 24, 30, 35, 40, 22, 23, 27]\nplt.hist(ages, bins=5, color='orange', edgecolor='black')\nplt.xlabel('Age Group')\nplt.ylabel('Frequency')\nplt.title('Age Histogram')\nplt.show()", output: "[Histogram Output: Plot successfully generated.]" },
    { id: 19, cat: "python", title: "Matplotlib: Scatter Plot for Correlation", q: "Write a Python program to visualize the correlation between 'Hours Studied' and 'Scores' using a scatter plot.", code: "import matplotlib.pyplot as plt\n\nhrs = [2, 3.5, 1, 5, 4.5, 3, 6, 2.5]\nscores = [50, 65, 30, 85, 80, 60, 95, 55]\nplt.scatter(hrs, scores, color='purple')\nplt.xlabel('Hours Studied')\nplt.ylabel('Scores')\nplt.title('Hours vs. Scores')\nplt.grid(True)\nplt.show()", output: "[Scatter Plot Output: Positive trend observed.]" },
    { id: 20, cat: "python", title: "Matplotlib: Line Plot for Comparing Trends", q: "Write a Python program to plot a line graph comparing the sales of two products over 4 years.", code: "import matplotlib.pyplot as plt\n\nyears = [2020, 2021, 2022, 2023]\nprod_a = [100, 150, 120, 180]\nprod_b = [80, 120, 140, 160]\nplt.plot(years, prod_a, label='Product A', marker='o')\nplt.plot(years, prod_b, label='Product B', marker='s')\nplt.legend()\nplt.show()", output: "[Line Plot Output: Dual line graph generated.]" },
    { id: 21, cat: "python", title: "Matplotlib: Pie Chart for Market Share", q: "Write a Python program to create a pie chart representing the market share of different OS.", code: "import matplotlib.pyplot as plt\n\nlabels = ['Android', 'iOS', 'Windows', 'Others']\nshares = [70, 25, 3, 2]\nplt.pie(shares, labels=labels, autopct='%1.1f%%')\nplt.title('OS Market Share')\nplt.show()", output: "[Pie Chart Output: Sector visualization generated.]" },
    { id: 21, cat: "python", title: "Matplotlib: Pie Chart for Market Share", q: "Write a Python program to create a pie chart representing the market share of different OS.", code: "import matplotlib.pyplot as plt\n\nlabels = ['Android', 'iOS', 'Windows', 'Others']\nshares = [70, 25, 3, 2]\nplt.pie(shares, labels=labels, autopct='%1.1f%%')\nplt.title('OS Market Share')\nplt.show()", output: "[Pie Chart Output: Sector visualization generated.]" },
    { id: 22, cat: "python", title: "Matplotlib: Box Plot for Outlier Detection", q: "Write a Python program to create a boxplot to visualize the distribution of a dataset and identify potential outliers.", code: "import matplotlib.pyplot as plt\n\ndata = [12, 15, 14, 10, 13, 11, 45]\nplt.boxplot(data)\nplt.title('Feature Distribution')\nplt.show()", output: "[Boxplot Output: Outlier at value 45.]" },
    { id: 23, cat: "python", title: "Pandas: Create a DataFrame from a List of Dicts", q: "Write a Python program to create a Pandas DataFrame from a list of dictionaries.", code: "import pandas as pd\n\ndata = [\n    {'Name': 'Amit', 'Age': 28},\n    {'Name': 'Priya', 'Age': 32}\n]\ndf = pd.DataFrame(data)\nprint(df)", output: "    Name  Age\n0   Amit   28\n1  Priya   32" },
    { id: 24, cat: "python", title: "Pandas: Access Data with .loc and .iloc", q: "Write a Python program to access a single value from a DataFrame at row index 1 and column 'Score' using both .loc and .iloc.", code: "import pandas as pd\n\ndf = pd.DataFrame({'Score': [88, 92, 79]})\nprint('Using .loc:', df.loc[1, 'Score'])\nprint('Using .iloc:', df.iloc[1, 0])", output: "Using .loc: 92\nUsing .iloc: 92" },
    { id: 25, cat: "python", title: "Pandas: Get Summary Statistics with .describe()", q: "Write a Python program to generate summary statistics for a numeric column in a DataFrame using .describe().", code: "import pandas as pd\n\ndf = pd.DataFrame({'Marks': [88, 92, 79, 85, 95]})\nprint(df['Marks'].describe())", output: "count     5.000000\nmean     87.800000\nstd       6.260990\nmin      79.000000\n25%      85.000000\n50%      88.000000\n75%      92.000000\nmax      95.000000\nName: Marks, dtype: float64" },
    { id: 26, cat: "python", title: "Pandas: Apply a Custom Function to a Column", q: "Write a Python program to apply a custom function that adds a 'Pass/Fail' status to a DataFrame based on marks >= 40.", code: "import pandas as pd\n\ndf = pd.DataFrame({'Marks': [39, 40, 85]})\ndef check_pass(mark):\n    return 'Pass' if mark >= 40 else 'Fail'\ndf['Status'] = df['Marks'].apply(check_pass)\nprint(df)", output: "   Marks Status\n0     39   Fail\n1     40   Pass\n2     85   Pass" },
    { id: 27, cat: "python", title: "Pandas: Correlation Matrix", q: "Write a Python program to compute and display a correlation matrix for a DataFrame with multiple numeric columns.", code: "import pandas as pd\n\ndf = pd.DataFrame({\n    'Study_Hrs': [2, 4, 6, 8],\n    'Play_Hrs': [8, 6, 4, 2],\n    'Marks': [50, 65, 80, 95]\n})\ncorr = df.corr()\nprint(corr)", output: "           Study_Hrs  Play_Hrs  Marks\nStudy_Hrs        1.0      -1.0    1.0\nPlay_Hrs        -1.0       1.0   -1.0\nMarks            1.0      -1.0    1.0" },
    { id: 28, cat: "python", title: "Pandas: Save and Load DataFrame to Excel", q: "Write a Python program that saves a DataFrame to an Excel file named 'report.xlsx' and then reads it back.", code: "import pandas as pd\n\ndf = pd.DataFrame({'A': [1, 2], 'B': [3, 4]})\ndf.to_excel('report.xlsx', index=False)\ndf_loaded = pd.read_excel('report.xlsx')\nprint('Loaded DataFrame:\\n', df_loaded)", output: "Loaded DataFrame:\n    A  B\n0  1  3\n1  2  4" },
    { id: 29, cat: "python", title: "Matplotlib: Subplots for Multiple Charts", q: "Write a Python program to create a figure with two subplots: one bar chart and one line chart.", code: "import matplotlib.pyplot as plt\n\nfig, axes = plt.subplots(nrows=1, ncols=2, figsize=(10, 4))\n\naxes[0].bar(['A', 'B'], [10, 20])\naxes[0].set_title('Bar Chart')\n\naxes[1].plot([1, 2, 3], [5, 10, 15])\naxes[1].set_title('Line Chart')\n\nplt.tight_layout()\nplt.show()", output: "[Chart Output: Figure with two subplots generated.]" },
    { id: 30, cat: "python", title: "Pandas: Query Method for Filtering", q: "Write a Python program to filter a DataFrame using the `.query()` method to find all students with marks greater than 80.", code: "import pandas as pd\n\ndf = pd.DataFrame({\n    'Name': ['Amit', 'Priya', 'Rahul'],\n    'Marks': [88, 92, 79]\n})\nprint(df.query('Marks > 80'))", output: "    Name  Marks\n0   Amit     88\n1  Priya     92" },
    { id: 31, cat: "python", title: "Pandas: Set a Column as the Index", q: "Write a Python program to set a specific column of a DataFrame as its index and then reset it.", code: "import pandas as pd\n\ndf = pd.DataFrame({'ID': [101, 102], 'Name': ['A', 'B']})\ndf_indexed = df.set_index('ID')\nprint('DataFrame with new index:\\n', df_indexed)\nprint('\\nDataFrame with reset index:\\n', df_indexed.reset_index())", output: "DataFrame with new index:\n      Name\nID       \n101     A\n102     B\n\nDataFrame with reset index:\n    ID Name\n0 101    A\n1 102    B" },
    { id: 32, cat: "python", title: "Matplotlib: Customize Line Style and Color", q: "Write a Python program to plot a red dashed line graph with circle markers.", code: "import matplotlib.pyplot as plt\n\nx = [1, 2, 3, 4]\ny = [10, 12, 8, 15]\nplt.plot(x, y, color='red', linestyle='--', marker='o')\nplt.show()", output: "[Line Plot Output: Customized line graph generated.]" },
    { id: 33, cat: "python", title: "Pandas: Rename Columns Using a Function", q: "Write a Python program to rename all columns of a DataFrame to uppercase.", code: "import pandas as pd\n\ndf = pd.DataFrame({'name': ['A'], 'score': [90]})\ndf.columns = [col.upper() for col in df.columns]\nprint(df)", output: "  NAME  SCORE\n0    A     90" },
    { id: 34, cat: "python", title: "Scikit-learn: Train-Test Split", q: "Write a Python program to split a dataset into 70% training and 30% testing sets for model building.", code: "from sklearn.model_selection import train_test_split\nimport numpy as np\n\nX = np.arange(20).reshape((10, 2))\ny = np.array([0, 0, 0, 0, 0, 1, 1, 1, 1, 1])\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)\nprint('X Train shape:', X_train.shape)\nprint('X Test shape :', X_test.shape)", output: "X Train shape: (7, 2)\nX Test shape : (3, 2)" },
    { id: 35, cat: "python", title: "Scikit-learn: Feature Scaling with MinMaxScaler", q: "Write a Python program to scale a numeric feature between 0 and 1 using MinMaxScaler.", code: "from sklearn.preprocessing import MinMaxScaler\nimport numpy as np\n\ndata = np.array([[100], [200], [300], [400], [500]])\nscaler = MinMaxScaler()\nscaled_data = scaler.fit_transform(data)\nprint(scaled_data.flatten())", output: "[0.   0.25 0.5  0.75 1.  ]" },
    { id: 36, cat: "python", title: "Scikit-learn: Label Encoding for Categorical Data", q: "Write a Python program to convert categorical text labels ('Red', 'Blue', 'Green') into numerical values using LabelEncoder.", code: "from sklearn.preprocessing import LabelEncoder\nimport pandas as pd\n\ndf = pd.DataFrame({'Color': ['Red', 'Blue', 'Green', 'Blue', 'Red']})\nle = LabelEncoder()\ndf['Color_Encoded'] = le.fit_transform(df['Color'])\nprint(df)", output: "   Color  Color_Encoded\n0    Red              2\n1   Blue              0\n2  Green              1\n3   Blue              0\n4    Red              2" },
    { id: 37, cat: "python", title: "Scikit-learn: Standardizing Features with StandardScaler", q: "Write a Python program to standardize features to have a mean of 0 and a standard deviation of 1 using StandardScaler.", code: "from sklearn.preprocessing import StandardScaler\nimport numpy as np\n\ndata = np.array([[10], [20], [30], [40], [50]])\nscaled_data = StandardScaler().fit_transform(data)\nprint('Mean:', round(scaled_data.mean(), 2))\nprint('Std :', round(scaled_data.std(), 2))", output: "Mean: 0.0\nStd : 1.0" },
    { id: 38, cat: "python", title: "Scikit-learn: Linear Regression Model", q: "Write a Python program to fit a Linear Regression model and print the slope and intercept.", code: "from sklearn.linear_model import LinearRegression\nimport numpy as np\n\nX = np.array([[1], [2], [3], [4], [5]])\ny = np.array([3, 5, 7, 9, 11])\nmodel = LinearRegression().fit(X, y)\nprint('Slope:', model.coef_[0])\nprint('Intercept:', model.intercept_)", output: "Slope: 2.0\nIntercept: 1.0" },
    { id: 39, cat: "python", title: "Scikit-learn: Logistic Regression for Binary Classification", q: "Write a Python program to create and train a Logistic Regression model on sample data.", code: "from sklearn.linear_model import LogisticRegression\nimport numpy as np\n\nX = np.array([[1], [2], [3], [4], [5]])\ny = np.array([0, 0, 0, 1, 1])\nmodel = LogisticRegression().fit(X, y)\nprint('Prediction for 3.5:', model.predict([[3.5]]))", output: "Prediction for 3.5: [1]" },
    { id: 40, cat: "python", title: "Scikit-learn: K-Nearest Neighbors (KNN) Classifier", q: "Write a Python program to classify a new data point using a KNN Classifier with k=3.", code: "from sklearn.neighbors import KNeighborsClassifier\n\nX = [[0], [1], [2], [3]]\ny = [0, 0, 1, 1]\nneigh = KNeighborsClassifier(n_neighbors=3).fit(X, y)\nprint('Prediction for 1.5:', neigh.predict([[1.5]]))", output: "Prediction for 1.5: [0]" },
    { id: 41, cat: "python", title: "Scikit-learn: Decision Tree Classifier", q: "Write a Python program to build a Decision Tree Classifier on a small dataset and make a prediction.", code: "from sklearn.tree import DecisionTreeClassifier\nimport numpy as np\n\nX = [[1, 2], [2, 3], [3, 1], [4, 3]]\ny = [0, 0, 1, 1]\nclf = DecisionTreeClassifier().fit(X, y)\nprint('Prediction for [3, 2]:', clf.predict([[3, 2]]))", output: "Prediction for [3, 2]: [1]" },
    { id: 42, cat: "python", title: "Scikit-learn: Confusion Matrix", q: "Write a Python program to compute and display a confusion matrix for a classification model.", code: "from sklearn.metrics import confusion_matrix\n\ny_true = [1, 0, 1, 1, 0, 1]\ny_pred = [1, 0, 1, 0, 0, 1]\ncm = confusion_matrix(y_true, y_pred)\nprint('Confusion Matrix:\\n', cm)", output: "Confusion Matrix:\n [[2 0]\n [1 3]]" },
    { id: 43, cat: "python", title: "Scikit-learn: Classification Model Metrics (Accuracy, Precision, Recall)", q: "Write a Python program to compute Accuracy, Precision, and Recall for a classification model.", code: "from sklearn.metrics import accuracy_score, precision_score, recall_score\n\ny_true = [1, 0, 1, 1, 0, 1, 0, 0, 1, 1]\ny_pred = [1, 0, 0, 1, 0, 1, 1, 0, 1, 1]\nprint(f'Accuracy : {accuracy_score(y_true, y_pred):.2f}')\nprint(f'Precision: {precision_score(y_true, y_pred):.2f}')\nprint(f'Recall   : {recall_score(y_true, y_pred):.2f}')", output: "Accuracy : 0.80\nPrecision: 0.83\nRecall   : 0.83" },
    { id: 44, cat: "python", title: "Scikit-learn: One-Hot Encoding for Categorical Data", q: "Write a Python program to perform One-Hot Encoding on a 'City' column using `pd.get_dummies()`.", code: "import pandas as pd\n\ndf = pd.DataFrame({'City': ['Delhi', 'Mumbai', 'Delhi', 'Chennai']})\ndf_encoded = pd.get_dummies(df, columns=['City'])\nprint(df_encoded)", output: "   City_Chennai  City_Delhi  City_Mumbai\n0             0           1            0\n1             0           0            1\n2             0           1            0\n3             1           0            0" },
    { id: 45, cat: "python", title: "Scikit-learn: K-Means Clustering", q: "Write a Python program to cluster 2D data points into 2 clusters using KMeans.", code: "from sklearn.cluster import KMeans\nimport numpy as np\n\nX = np.array([[1, 2], [1, 4], [1, 0], [10, 2], [10, 4], [10, 0]])\nkmeans = KMeans(n_clusters=2, random_state=0).fit(X)\nprint('Cluster Labels:', kmeans.labels_)", output: "Cluster Labels: [1 1 1 0 0 0]" },
    { id: 46, cat: "python", title: "Scikit-learn: Naive Bayes Classification", q: "Write a Python script to perform Gaussian Naive Bayes classification on a sample dataset.", code: "from sklearn.naive_bayes import GaussianNB\n\nX = [[-1, -1], [-2, -1], [-3, -2], [1, 1], [2, 1], [3, 2]]\nY = [1, 1, 1, 2, 2, 2]\nclf = GaussianNB().fit(X, Y)\nprint('Predict [-0.8, -1]:', clf.predict([[-0.8, -1]]))", output: "Predict [-0.8, -1]: [1]" },
    { id: 47, cat: "python", title: "Scikit-learn: Support Vector Machine (SVM)", q: "Write a Python program to classify data using an SVM with a linear kernel.", code: "from sklearn.svm import SVC\n\nX = [[0, 0], [1, 1], [1, 0]]\ny = [0, 1, 1]\nclf = SVC(kernel='linear').fit(X, y)\nprint('Predict [0,1]:', clf.predict([[0, 1]]))", output: "Predict [0,1]: [0]" },
    { id: 48, cat: "python", title: "Scikit-learn: PCA for Dimensionality Reduction", q: "Write a Python program to reduce a 4-dimensional feature set to 2 dimensions using Principal Component Analysis (PCA).", code: "from sklearn.decomposition import PCA\nimport numpy as np\n\nX = np.random.rand(10, 4)\npca = PCA(n_components=2)\nX_reduced = pca.fit_transform(X)\nprint('Original shape:', X.shape)\nprint('Reduced shape :', X_reduced.shape)", output: "Original shape: (10, 4)\nReduced shape : (10, 2)" },
    { id: 49, cat: "python", title: "Scikit-learn: Generating Synthetic Data", q: "Write a Python program to generate a synthetic dataset for binary classification using `make_classification`.", code: "from sklearn.datasets import make_classification\n\nX, y = make_classification(n_samples=100, n_features=4, random_state=42)\nprint('Features matrix shape:', X.shape)\nprint('Target vector shape  :', y.shape)", output: "Features matrix shape: (100, 4)\nTarget vector shape  : (100,)" },
    { id: 50, cat: "python", title: "Scikit-learn: Random Forest Classifier", q: "Write a Python program to classify data using a RandomForestClassifier.", code: "from sklearn.ensemble import RandomForestClassifier\n\nX = [[0, 0], [1, 1]]\ny = [0, 1]\nclf = RandomForestClassifier(n_estimators=10).fit(X, y)\nprint('Predict [1,0]:', clf.predict([[1, 0]]))", output: "Predict [1,0]: [1]" },
    { id: 51, cat: "orange", title: "Orange: Iris Classification", q: "Build a visual workflow to classify the Iris flower dataset using a Decision Tree.", datasetDesc: "Iris dataset: 150 instances, 4 numeric features (sepal/petal length/width), and a 3-class target variable.", code: "File (iris.tab) -> Data Table -> Decision Tree -> Test & Score -> Predictions", output: "Predictions will show high accuracy for classifying Iris species." },
    { id: 52, cat: "orange", title: "Orange: Titanic Survival Prediction", q: "Construct a workflow to evaluate passenger survival probabilities using Logistic Regression.", datasetDesc: "Titanic dataset: Includes features like Passenger Class, Age, Sex, and the target variable 'Survived'.", code: "File (titanic.tab) -> Select Columns -> Logistic Regression -> Test & Score -> Confusion Matrix", output: "Model will show accuracy, F1-score, and a confusion matrix for survival prediction." },
    { id: 53, cat: "orange", title: "Orange: Housing Price Prediction", q: "Build a predictive pipeline to estimate housing prices using k-NN regression.", datasetDesc: "Housing dataset: Features like crime rate, average rooms, distance to employment, predicting a continuous target variable (price).", code: "File (housing.tab) -> kNN Regressor (k=5) -> Test & Score", output: "Results will include Mean Squared Error (MSE) and Root Mean Squared Error (RMSE)." },
    { id: 54, cat: "orange", title: "Orange: Heart Disease Detection", q: "Design a diagnostic workflow to predict heart disease risk using a Naive Bayes classifier.", datasetDesc: "Heart Disease dataset: Clinical parameters (age, cholesterol, max heart rate) and a binary target variable for disease presence.", code: "File (heart_disease.tab) -> Naive Bayes -> Test & Score", output: "Output will show classification accuracy and AUC value." },
    { id: 55, cat: "orange", title: "Orange: Customer Churn Prediction", q: "Construct an Orange workflow using Random Forest and ROC Analysis to evaluate customer churn.", datasetDesc: "Customer Churn dataset: Features like credit score, balance, tenure, and a binary target variable (Churn or Retain).", code: "File (customer_churn.tab) -> Random Forest -> Test & Score -> ROC Analysis -> Predictions", output: "Will display AUC, Classification Accuracy, and individual prediction confidences." },
    { id: 56, cat: "orange", title: "Orange: Data Preprocessing - Impute Missing Values", q: "Design a pipeline to clean missing data values using the Impute widget.", datasetDesc: "Raw Sales Data: Contains 15% missing entries in 'Revenue' and 'Customer Age' features.", code: "File (raw_data.tab) -> Impute -> Data Table", output: "Data Table will show the dataset with missing values replaced by mean/median." },
    { id: 57, cat: "orange", title: "Orange: Hierarchical Clustering of Animals", q: "Construct a visual clustering pipeline to create a hierarchical dendrogram of a zoo animals dataset.", datasetDesc: "Zoo dataset: 101 animals with categorical features like hair, feathers, eggs, milk, and legs.", code: "File (zoo.tab) -> Distances (Euclidean) -> Hierarchical Clustering -> Dendrogram", output: "Dendrogram will visually group animals based on their features (e.g., mammals, birds)." },
    { id: 58, cat: "orange", title: "Orange: SVM for Wine Quality", q: "Build a workflow to classify wine quality samples using a Support Vector Machine (SVM).", datasetDesc: "Wine dataset: 178 samples with 13 chemical constituents (alcohol, malic acid, ash) as features.", code: "File (wine.tab) -> SVM -> Test & Score -> Predictions", output: "Will show high accuracy and prediction confidence for classifying different wine cultivars." },
    { id: 59, cat: "orange", title: "Orange: PCA Scatter Plot", q: "Design a workflow to project high-dimensional data onto a 2D space using a PCA widget.", datasetDesc: "Iris Data (4D) projected onto two principal component axes for 2D visualization.", code: "File (iris.tab) -> PCA (Components=2) -> Scatter Plot", output: "Scatter Plot will show data points colored by class, separated along PC1 and PC2." },
    { id: 60, cat: "orange", title: "Orange: Linear Regression for Fuel Efficiency", q: "Construct a workflow to fit a Linear Regression model for predicting vehicle fuel efficiency (MPG).", datasetDesc: "Auto MPG Dataset: Features like cylinders, displacement, horsepower, and weight predicting a numeric MPG value.", code: "File (auto-mpg.tab) -> Linear Regression", output: "A Data Table will show regression coefficients (e.g., weight has a negative impact on MPG)." },
    { id: 61, cat: "orange", title: "Orange: Feature Ranking", q: "Build a workflow using the Rank widget to identify the most informative features in a dataset.", datasetDesc: "Adult Income Dataset: Evaluate feature importance for predicting if salary is > $50k.", code: "File (adult.tab) -> Rank (Information Gain)", output: "A ranked list of features (e.g., Capital Gain, Education Num) by their importance score." },
    { id: 62, cat: "orange", title: "Orange: K-Means Customer Segmentation", q: "Construct a visual clustering setup to group customers into segments using the k-Means widget.", datasetDesc: "Mall Customers Dataset: Features are 'Annual Income' and 'Spending Score'.", code: "File (customers.tab) -> k-Means (k=3) -> Silhouette Plot -> Scatter Plot", output: "Scatter plot will visualize 3 distinct customer segments." },
    { id: 63, cat: "orange", title: "Orange: Outlier Detection", q: "Build a workflow to identify anomalous data points using the Outliers widget.", datasetDesc: "Financial Transaction Logs: Detect potential fraudulent transactions.", code: "File (transactions.tab) -> Outliers (Local Outlier Factor) -> Data Table", output: "The Data Table will flag potential outliers, such as unusually high transfer amounts." },
    { id: 64, cat: "orange", title: "Orange: Neural Network Classifier", q: "Design a workflow to predict student course completion using a Neural Network classifier.", datasetDesc: "Student Performance Dataset: Features include attendance, test scores, and assignments, with a Pass/Fail target.", code: "File (student_perf.tab) -> Neural Network -> Test & Score", output: "Model will show classification accuracy and AUC score." },
    { id: 65, cat: "orange", title: "Orange: Model Benchmarking (10-fold CV)", q: "Construct a benchmarking workflow to compare Decision Tree, SVM, and Naive Bayes models using 10-fold CV.", datasetDesc: "Breast Cancer Diagnostic Dataset: Benchmarking three models across patient records.", code: "File (cancer_data) -> [Decision Tree, SVM, Naive Bayes] -> Test & Score (10-fold CV)", output: "A single leaderboard table ranking the models by accuracy, F1, and AUC." },
    { id: 66, cat: "orange", title: "Orange: Image Analytics - Reading Digits", q: "Construct an Orange workflow to load and visualize a dataset of hand-written digits.", datasetDesc: "Digits dataset: 1797 images of handwritten digits (0-9), each represented as an 8x8 pixel matrix.", code: "File (digits.tab) -> Data Table -> Image Viewer", output: "Image Viewer will display a sample of the loaded digit images." },
    { id: 67, cat: "orange", title: "Orange: Text Mining - Word Cloud", q: "Construct a workflow to generate a word cloud from a corpus of text documents.", datasetDesc: "Text Corpus: A collection of news articles or reviews.", code: "File (text_corpus.tab) -> Corpus Viewer -> Preprocess Text -> Word Cloud", output: "A word cloud image visualizing the most frequent terms in the text." },
    { id: 68, cat: "orange", title: "Orange: Scatter Plot for Feature Relationship", q: "Build a workflow to create a scatter plot to visualize the relationship between 'Petal Length' and 'Petal Width' in the Iris dataset, colored by species.", datasetDesc: "Iris dataset: Features include petal and sepal dimensions.", code: "File (iris.tab) -> Scatter Plot (Axis: Petal Length vs Petal Width, Color: Iris Species)", output: "Scatter Plot will show clear separation of the 'Iris-setosa' species." },
    { id: 69, cat: "orange", title: "Orange: Box Plot for Comparing Distributions", q: "Design a workflow to compare the 'Age' distribution of survivors vs. non-survivors in the Titanic dataset.", datasetDesc: "Titanic dataset with 'Age' and 'Survived' columns.", code: "File (titanic.tab) -> Box Plot (Variable: Age, Group by: Survived)", output: "Box Plot will show the age quartiles for each survival group." },
    { id: 70, cat: "orange", title: "Orange: Data Table for Data Exploration", q: "Build a workflow to load a dataset and inspect its contents using the Data Table widget.", datasetDesc: "Any dataset, for example, the Iris dataset.", code: "File (iris.tab) -> Data Table", output: "Data Table will display all rows and columns, allowing for sorting and filtering." },
    { id: 71, cat: "python", title: "Pandas: Handle Categorical Data with `.astype()`", q: "Write a Python program to convert a string column ('Pass'/'Fail') to a categorical data type.", code: "import pandas as pd\n\ndf = pd.DataFrame({'Result': ['Pass', 'Fail', 'Pass']})\ndf['Result'] = df['Result'].astype('category')\nprint(df.dtypes)", output: "Result    category\ndtype: object" },
    { id: 72, cat: "python", title: "Scikit-learn: Mean Absolute Error (MAE)", q: "Write a Python program to compute the Mean Absolute Error (MAE) between actual and predicted targets.", code: "from sklearn.metrics import mean_absolute_error\n\ny_true = [3.0, -0.5, 2.0, 7.0]\ny_pred = [2.5, 0.0, 2.0, 8.0]\nprint('MAE:', mean_absolute_error(y_true, y_pred))", output: "MAE: 0.5" },
    { id: 73, cat: "python", title: "Scikit-learn: Mean Squared Error (MSE)", q: "Write a Python program to compute the Mean Squared Error (MSE) between actual and predicted targets.", code: "from sklearn.metrics import mean_squared_error\n\ny_true = [3, -0.5, 2, 7]\ny_pred = [2.5, 0.0, 2, 8]\nprint('MSE:', mean_squared_error(y_true, y_pred))", output: "MSE: 0.375" },
    { id: 74, cat: "python", title: "Matplotlib: Saving a Plot to a File", q: "Write a Python program to create a bar chart and save it as a PNG image file.", code: "import matplotlib.pyplot as plt\n\nplt.bar(['A', 'B'], [10, 20])\nplt.title('Sample Bar Chart')\nplt.savefig('my_bar_chart.png')\nprint('Plot saved!')", output: "Plot saved!" },
    { id: 75, cat: "python", title: "Pandas: Calculate Sum and Mean of a Column", q: "Write a Python program to calculate the sum and mean of the 'Marks' column in a DataFrame.", code: "import pandas as pd\n\ndf = pd.DataFrame({'Marks': [88, 92, 79, 85, 95]})\ntotal_marks = df['Marks'].sum()\naverage_marks = df['Marks'].mean()\nprint('Total Marks:', total_marks)\nprint('Average Marks:', average_marks)", output: "Total Marks: 439\nAverage Marks: 87.8" },
    { id: 76, cat: "python", title: "Pandas: Unique Values in a Column", q: "Write a Python program to find all unique values in the 'Department' column of an employee DataFrame.", code: "import pandas as pd\n\ndf = pd.DataFrame({'Dept': ['HR', 'IT', 'IT', 'Finance', 'HR']})\nprint(df['Dept'].unique())", output: "['HR' 'IT' 'Finance']" },
    { id: 77, cat: "python", title: "Scikit-learn: Prepare Data for Modeling", q: "Write a Python program to separate features (X) and the target variable (y) from a Pandas DataFrame.", code: "import pandas as pd\n\ndf = pd.DataFrame({\n    'Feature1': [1, 2, 3],\n    'Feature2': ['A', 'B', 'C'],\n    'Target': [0, 1, 0]\n})\nX = df[['Feature1', 'Feature2']]\ny = df['Target']\nprint('Features (X):\\n', X)\nprint('\\nTarget (y):\\n', y)", output: "Features (X):\n    Feature1 Feature2\n0         1        A\n1         2        B\n2         3        C\n\nTarget (y):\n 0    0\n1    1\n2    0\nName: Target, dtype: int64" },
    { id: 78, cat: "python", title: "Pandas: Handling Mixed Data Types", q: "Write a Python program to inspect the data types of each column in a DataFrame.", code: "import pandas as pd\n\ndf = pd.DataFrame({\n    'A': [1, 2, 3],\n    'B': [1.1, 2.2, 3.3],\n    'C': ['x', 'y', 'z'],\n    'D': [True, False, True]\n})\nprint(df.dtypes)", output: "A      int64\nB    float64\nC     object\nD       bool\ndtype: object" },
    { id: 79, cat: "python", title: "Pandas: Adding a Conditional Column with np.where", q: "Write a Python program to add a 'Bonus' column: 1000 if Salary > 50000, else 500, using np.where.", code: "import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({'Salary': [45000, 60000, 75000]})\ndf['Bonus'] = np.where(df['Salary'] > 50000, 1000, 500)\nprint(df)", output: "   Salary  Bonus\n0   45000    500\n1   60000   1000\n2   75000   1000" },
    { id: 80, cat: "python", title: "Matplotlib: Create a Stacked Bar Chart", q: "Write a Python program to create a stacked bar chart to show sales in two regions over three months.", code: "import matplotlib.pyplot as plt\nimport numpy as np\n\nmonths = ['Jan', 'Feb', 'Mar']\nregion1 = [10, 15, 12]\nregion2 = [8, 9, 14]\n\nplt.bar(months, region1, label='Region 1')\nplt.bar(months, region2, bottom=region1, label='Region 2')\nplt.legend()\nplt.show()", output: "[Chart Output: Stacked bar chart generated.]" },
    { id: 81, cat: "python", title: "Scikit-learn: Train a Simple Linear Model on a DataFrame", q: "Write a Python program to train a LinearRegression model using a Pandas DataFrame.", code: "import pandas as pd\nfrom sklearn.linear_model import LinearRegression\n\ndf = pd.DataFrame({\n    'Experience': [1, 2, 3, 4, 5],\n    'Salary': [40000, 45000, 50000, 55000, 60000]\n})\nX = df[['Experience']]\ny = df['Salary']\nmodel = LinearRegression().fit(X, y)\nprint('Intercept:', model.intercept_)\nprint('Coefficient:', model.coef_[0])", output: "Intercept: 35000.0\nCoefficient: 5000.0" },
    { id: 82, cat: "python", title: "Pandas: Drop a Column from a DataFrame", q: "Write a Python program to remove a specific column from a DataFrame.", code: "import pandas as pd\n\ndf = pd.DataFrame({'A': [1, 2], 'B': [3, 4]})\ndf_dropped = df.drop(columns=['B'])\nprint(df_dropped)", output: "   A\n0  1\n1  2" },
    { id: 83, cat: "python", title: "Matplotlib: Customizing Histogram Bins", q: "Write a Python program to create a histogram with a custom number of bins and a specific color.", code: "import matplotlib.pyplot as plt\nimport numpy as np\n\ndata = np.random.randn(100)\nplt.hist(data, bins=20, color='green')\nplt.title('Custom Histogram')\nplt.show()", output: "[Histogram Output: Plot with 20 bins generated.]" },
    { id: 84, cat: "python", title: "Scikit-learn: Elbow Method for K-Means", q: "Write a Python program to plot the 'Elbow Method' to find the optimal number of clusters for K-Means.", code: "import matplotlib.pyplot as plt\nfrom sklearn.cluster import KMeans\nimport numpy as np\n\nX = np.random.rand(50, 2)\ninertias = []\nfor k in range(1, 11):\n    km = KMeans(n_clusters=k, random_state=0).fit(X)\n    inertias.append(km.inertia_)\nplt.plot(range(1, 11), inertias, marker='o')\nplt.title('Elbow Method')\nplt.xlabel('Number of Clusters')\nplt.ylabel('Inertia')\nplt.show()", output: "[Line Plot Output: A clear 'elbow' on the plot indicating the optimal number of clusters.]" },
    { id: 85, cat: "python", title: "Pandas: Iterate Over DataFrame Rows", q: "Write a Python program to iterate over the rows of a DataFrame using `.iterrows()` and print each row.", code: "import pandas as pd\n\ndf = pd.DataFrame({'Name': ['A', 'B'], 'Score': [90, 85]})\nfor index, row in df.iterrows():\n    print(f'Index {index}: Name={row[\"Name\"]}, Score={row[\"Score\"]}')", output: "Index 0: Name=A, Score=90\nIndex 1: Name=B, Score=85" },
    { id: 86, cat: "python", title: "Matplotlib: Adding Annotations to a Plot", q: "Write a Python program to add a text annotation to a specific data point on a line plot.", code: "import matplotlib.pyplot as plt\n\nx = [1, 2, 3]\ny = [10, 25, 15]\nplt.plot(x, y, marker='o')\nplt.annotate('Peak Value', xy=(2, 25), xytext=(2.2, 22),\n             arrowprops=dict(facecolor='black', shrink=0.05))\nplt.show()", output: "[Chart Output: Line plot with an annotation pointing to the peak.]" },
    { id: 87, cat: "python", title: "Pandas: Replacing Values in a Column", q: "Write a Python program to replace all occurrences of 'Male' with 'M' and 'Female' with 'F' in a 'Gender' column.", code: "import pandas as pd\n\ndf = pd.DataFrame({'Gender': ['Male', 'Female', 'Male']})\ndf['Gender'] = df['Gender'].replace({'Male': 'M', 'Female': 'F'})\nprint(df)", output: "  Gender\n0      M\n1      F\n2      M" },
    { id: 88, cat: "python", title: "Scikit-learn: Cross-Validation Score", q: "Write a Python program to evaluate a model using cross-validation and print the mean score.", code: "from sklearn.model_selection import cross_val_score\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.datasets import make_classification\n\nX, y = make_classification(random_state=0)\nmodel = LogisticRegression(solver='liblinear')\nscores = cross_val_score(model, X, y, cv=5)\nprint('Cross-validation scores:', scores)\nprint('Mean CV Score:', scores.mean())", output: "Cross-validation scores: [0.85 0.8  0.85 0.9  0.8 ]\nMean CV Score: 0.84" },
    { id: 89, cat: "python", title: "Pandas: Create a DataFrame with a Date Range", q: "Write a Python program to create a DataFrame with a date-time index.", code: "import pandas as pd\n\ndates = pd.to_datetime(['2023-01-01', '2023-01-02', '2023-01-03'])\ndf = pd.DataFrame({'Value': [100, 110, 120]}, index=dates)\nprint(df)", output: "            Value\n2023-01-01    100\n2023-01-02    110\n2023-01-03    120" },
    { id: 90, cat: "python", title: "Matplotlib: Change Figure Size", q: "Write a Python program to create a plot with a specified figure size of 8x5 inches.", code: "import matplotlib.pyplot as plt\n\nplt.figure(figsize=(8, 5))\nplt.plot([1, 2, 3], [4, 5, 6])\nplt.title('Plot with Custom Size')\nplt.show()", output: "[Chart Output: Plot generated with 8x5 dimensions.]" },
    { id: 91, cat: "python", title: "Pandas: Count the Occurrences of a Value", q: "Write a Python program to count how many times the word 'Pass' appears in a 'Result' column.", code: "import pandas as pd\n\ndf = pd.DataFrame({'Result': ['Pass', 'Fail', 'Pass', 'Pass']})\npass_count = (df['Result'] == 'Pass').sum()\nprint('Number of Passes:', pass_count)", output: "Number of Passes: 3" },
    { id: 92, cat: "python", title: "Scikit-learn: Import a Standard Dataset", q: "Write a Python program to load the standard 'iris' dataset from `sklearn.datasets`.", code: "from sklearn.datasets import load_iris\niris = load_iris()\nprint('Data shape:', iris.data.shape)\nprint('Target names:', iris.target_names)", output: "Data shape: (150, 4)\nTarget names: ['setosa' 'versicolor' 'virginica']" },
    { id: 93, cat: "python", title: "Pandas: Handling Missing Data - Check with isnull()", q: "Write a Python program to check for missing values in a DataFrame and return a boolean DataFrame.", code: "import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\n    'A': [1, 2, np.nan],\n    'B': [np.nan, 5, 6]\n})\nprint(df.isnull())", output: "       A      B\n0  False   True\n1  False  False\n2   True  False" },
    { id: 94, cat: "python", title: "Pandas: Get the 3 Largest Values", q: "Write a Python program to get the top 3 largest values from a numeric Series.", code: "import pandas as pd\n\ns = pd.Series([1, 5, 2, 9, 7])\nprint(s.nlargest(3))", output: "3    9\n4    7\n1    5\ndtype: int64" },
    { id: 95, cat: "python", title: "Matplotlib: Creating a 3D Scatter Plot", q: "Write a Python program to create a 3D scatter plot.", code: "import matplotlib.pyplot as plt\nimport numpy as np\n\nfig = plt.figure()\nax = fig.add_subplot(projection='3d')\nxs = np.random.rand(50)\nys = np.random.rand(50)\nzs = np.random.rand(50)\nax.scatter(xs, ys, zs)\nplt.show()", output: "[Chart Output: 3D scatter plot generated.]" },
    { id: 96, cat: "python", title: "Scikit-learn: Feature Scaling with a DataFrame", q: "Write a Python program to apply StandardScaler to two columns of a Pandas DataFrame.", code: "import pandas as pd\nfrom sklearn.preprocessing import StandardScaler\n\ndf = pd.DataFrame({\n    'A': [10, 20, 30],\n    'B': [1, 5, 9]\n})\nscaler = StandardScaler()\ndf_scaled = pd.DataFrame(scaler.fit_transform(df), columns=df.columns)\nprint(df_scaled)", output: "          A         B\n0 -1.224745 -1.224745\n1  0.000000  0.000000\n2  1.224745  1.224745" },
    { id: 97, cat: "python", title: "Pandas: Apply Function to a DataFrame Column", q: "Write a Python program to apply a custom function that formats a name to be uppercase.", code: "import pandas as pd\n\ndf = pd.DataFrame({'Name': ['amit', 'priya']})\ndf['Name'] = df['Name'].apply(lambda x: x.upper())\nprint(df)", output: "    Name\n0   AMIT\n1  PRIYA" },
    { id: 98, cat: "python", title: "Pandas: Use `groupby` with Multiple Aggregations", q: "Write a Python program to group by 'Dept' and calculate both the mean and max of 'Salary'.", code: "import pandas as pd\n\ndf = pd.DataFrame({\n    'Dept': ['IT', 'HR', 'IT', 'HR'],\n    'Salary': [60000, 50000, 70000, 52000]\n})\nsummary = df.groupby('Dept')['Salary'].agg(['mean', 'max'])\nprint(summary)", output: "           mean    max\nDept                 \nHR      51000.0  52000\nIT      65000.0  70000" },
    { id: 99, cat: "python", title: "Pandas: Find the Row with the Maximum Value", q: "Write a Python program to find the entire row that has the maximum 'Marks'.", code: "import pandas as pd\n\ndf = pd.DataFrame({\n    'Student': ['A', 'B', 'C'],\n    'Marks': [78, 92, 85]\n})\nprint(df[df['Marks'] == df['Marks'].max()])", output: "  Student  Marks\n1       B     92" },
    { id: 100, cat: "python", title: "Matplotlib: Add a Legend to a Plot", q: "Write a Python program to plot two data series and add a legend to the chart.", code: "import matplotlib.pyplot as plt\n\nplt.plot([1, 2, 3], label='Series 1')\nplt.plot([3, 2, 1], label='Series 2')\nplt.legend()\nplt.show()", output: "[Chart Output: Line plot with a legend added.]" },
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
                    <span class="uppercase text-[9px] font-mono font-bold px-2 py-0.5 rounded ${item.cat === 'python' ? 'bg-blue-950 text-blue-300 border border-blue-800' : 'bg-orange-950 text-orange-300 border border-orange-800'}">${item.cat}</span>
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

function addPresetToProject(presetId) {
    const preset = presetLibrary.find(p => p.id === presetId);
    if (!preset) return;
    const newRec = {
        type: preset.cat, title: preset.title, question: preset.q, datasetDesc: preset.datasetDesc || "",
        code: preset.code || "", codeImg: "", dataImg: "", schemaImg: "", output: preset.output || "", outputImg: "", imgWidthPct: 100
    };
    state.records.push(newRec);
    saveToLocalStorage();
    renderEditorList();
    renderDocumentPreview();
    closePresetModal();
}

function addRandom15() {
    const pythonPresets = presetLibrary.filter(p => p.cat === 'python');
    const orangePresets = presetLibrary.filter(p => p.cat === 'orange');
    const shuffledPython = [...pythonPresets].sort(() => Math.random() - 0.5).slice(0, 10);
    const shuffledOrange = [...orangePresets].sort(() => Math.random() - 0.5).slice(0, 5);
    const randomSelection = [...shuffledPython, ...shuffledOrange];
    randomSelection.forEach(preset => {
        state.records.push({
            type: preset.cat, title: preset.title, question: preset.q, datasetDesc: preset.datasetDesc || "",
            code: preset.code || "", codeImg: "", dataImg: "", schemaImg: "", output: preset.output || "", outputImg: "", imgWidthPct: 100
        });
    });
    saveToLocalStorage();
    renderEditorList();
    renderDocumentPreview();
}

function addNewBlankRecord(type) {
    state.records.push({
        type: type,
        title: type === 'python' ? `Python Practical ${state.records.length + 1}: Title Here` : `Orange Task ${state.records.length + 1}: Title Here`,
        question: "Enter problem statement or objective here...",
        datasetDesc: type === 'orange' ? "Dataset details and attributes summary..." : "",
        code: type === 'python' ? "# Enter Python script code here\n" : "Workflow Pipeline Schema:\n[File] ---> [Widget] ---> [Predictions]",
        codeImg: "", dataImg: "", schemaImg: "",
        output: "Enter output result text or predictions table here...",
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
                    <span class="uppercase text-[9px] font-mono px-2 py-0.5 rounded ${isPython ? 'bg-blue-950 text-blue-300 border border-blue-900' : 'bg-orange-950 text-orange-300 border border-orange-900'}">${rec.type}</span>
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
            ${!isPython ? `
            <div>
                <label class="block text-[#8a8780] text-[11px] mb-1">Dataset Description</label>
                <textarea rows="2" oninput="updateRecordField(${idx}, 'datasetDesc', this.value)" class="w-full bg-[#0d0c0f] border border-[rgba(255,255,255,0.06)] rounded-lg p-2 text-slate-200 outline-none focus:border-[#c9a668]">${escapeHtml(rec.datasetDesc || '')}</textarea>
            </div>
            ` : ''}
            <div>
                <div class="flex justify-between items-center mb-1">
                    <label class="text-[#8a8780] text-[11px]">${isPython ? 'Source Code:' : 'Workflow Pipeline Schema:'}</label>
                    <label class="text-[#c9a668] hover:underline cursor-pointer text-[10px]">
                        Upload Code/Pipeline SS
                        <input type="file" accept="image/*" class="hidden" onchange="handleImageUpload(event, ${idx}, 'codeImg')">
                    </label>
                </div>
                <textarea rows="3" oninput="updateRecordField(${idx}, 'code', this.value)" class="w-full bg-[#0d0c0f] border border-[rgba(255,255,255,0.06)] rounded-lg p-2 font-code text-slate-300 text-[11px] outline-none focus:border-[#c9a668]">${escapeHtml(rec.code)}</textarea>
                ${rec.codeImg ? `<div class="mt-1 flex items-center justify-between text-emerald-400 text-[10px]"><span class="flex items-center gap-1"><i class="fa-solid fa-image"></i> Code SS attached</span><button onclick="removeImg(${idx}, 'codeImg')" class="text-rose-400 underline">Remove</button></div>` : ''}
            </div>
            ${!isPython ? `
            <div class="border-t border-[rgba(255,255,255,0.06)] pt-2.5">
                <div class="flex justify-between items-center mb-1">
                    <label class="text-[#8a8780] text-[11px]">Data Table Screenshot:</label>
                    <label class="text-[#c9a668] hover:underline cursor-pointer text-[10px]">
                        Upload Data SS
                        <input type="file" accept="image/*" class="hidden" onchange="handleImageUpload(event, ${idx}, 'dataImg')">
                    </label>
                </div>
                ${rec.dataImg ? `<div class="mt-1 flex items-center justify-between text-emerald-400 text-[10px]"><span class="flex items-center gap-1"><i class="fa-solid fa-table"></i> Data Table SS attached</span><button onclick="removeImg(${idx}, 'dataImg')" class="text-rose-400 underline">Remove</button></div>` : '<p class="text-[10px] text-slate-500 italic">No Data Table SS uploaded</p>'}
            </div>
            ` : ''}
            <div class="border-t border-[rgba(255,255,255,0.06)] pt-2.5">
                <div class="flex justify-between items-center mb-1">
                    <label class="text-[#8a8780] text-[11px]">${isPython ? 'Output / Result:' : 'Prediction / Classification Output SS:'}</label>
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
    localStorage.setItem('cbse_ai_project_data', JSON.stringify(state));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('cbse_ai_project_data');
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
        state.records = presetLibrary.slice(0, 10).concat(presetLibrary.slice(35, 40)).map(p => ({
            type: p.cat, title: p.title, question: p.q, datasetDesc: p.datasetDesc || "",
            code: p.code || "", codeImg: "", dataImg: "", schemaImg: "", output: p.output || "", outputImg: "", imgWidthPct: 100
        }));
    }
    highlightActiveStyles();
}

function exportProjectJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `CBSE_AI_Class12_Project_${state.meta.name.replace(/\s+/g, '_')}.json`);
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

    if (state.intro.showCover) {
        const coverPage = document.createElement('div');
        coverPage.className = "a4-page font-serif-doc";
        const style = state.intro.coverStyle || 'classic';
        if (style === 'modern') {
            coverPage.innerHTML = `
                <div class="h-full border-l-8 border-black pl-8 flex flex-col justify-between py-4">
                    <div>
                        <span class="text-xs font-bold font-sans tracking-widest uppercase bg-black text-white px-2 py-1">CBSE CLASS XII</span>
                        <h1 class="text-3xl font-extrabold uppercase mt-6 tracking-wide">ARTIFICIAL INTELLIGENCE</h1>
                        <p class="text-sm font-sans font-semibold text-gray-700 mt-1">SUBJECT CODE 417 • PRACTICAL FILE</p>
                    </div>
                    <div class="my-auto py-12">
                        <p class="text-xs uppercase tracking-widest text-gray-500 font-sans">Academic Session</p>
                        <p class="text-xl font-bold font-sans">${escapeHtml(state.meta.session)}</p>
                    </div>
                    <div class="grid grid-cols-2 gap-4 text-xs font-sans border-t border-black pt-6">
                        <div>
                            <p class="font-bold text-gray-500 text-[10px] uppercase">Submitted By:</p>
                            <p class="font-bold text-sm">${escapeHtml(state.meta.name)}</p>
                            <p>Roll No: ${escapeHtml(state.meta.roll)}</p>
                            <p>${escapeHtml(state.meta.className)}</p>
                            <p>${escapeHtml(state.meta.school)}</p>
                        </div>
                        <div class="text-right">
                            <p class="font-bold text-gray-500 text-[10px] uppercase">Evaluated By:</p>
                            <p class="font-bold text-sm">${escapeHtml(state.meta.teacher)}</p>
                            <p>Department of Computer Science & AI</p>
                        </div>
                    </div>
                </div>
            `;
        } else if (style === 'formal') {
            coverPage.innerHTML = `
                <div class="h-full border border-black p-8 flex flex-col justify-between text-center">
                    <div>
                        <h3 class="text-sm font-bold uppercase tracking-widest">${escapeHtml(state.meta.school)}</h3>
                        <p class="text-xs text-gray-600 mt-1">Affiliated to Central Board of Secondary Education (CBSE)</p>
                    </div>
                    <div class="my-auto py-8">
                        <h1 class="text-3xl font-bold uppercase underline tracking-wider">PROJECT RECORD FILE</h1>
                        <p class="text-base font-semibold mt-2">ARTIFICIAL INTELLIGENCE (CODE 417)</p>
                        <p class="text-xs italic text-gray-600 mt-4">Session: ${escapeHtml(state.meta.session)}</p>
                    </div>
                    <div class="grid grid-cols-2 text-left text-xs font-sans border-t border-black pt-4">
                        <div>
                            <p><strong>Name:</strong> ${escapeHtml(state.meta.name)}</p>
                            <p><strong>Roll No:</strong> ${escapeHtml(state.meta.roll)}</p>
                            <p><strong>Class:</strong> ${escapeHtml(state.meta.className)}</p>
                        </div>
                        <div class="text-right">
                            <p><strong>Teacher In-Charge:</strong></p>
                            <p>${escapeHtml(state.meta.teacher)}</p>
                        </div>
                    </div>
                </div>
            `;
        } else {
            coverPage.innerHTML = `
                <div class="h-full border-4 border-double border-black p-6 flex flex-col justify-between text-center">
                    <div>
                        <h2 class="text-sm font-bold tracking-widest uppercase">CBSE Academic Session ${escapeHtml(state.meta.session)}</h2>
                        <p class="text-xs uppercase mt-0.5 tracking-wider text-gray-700">Central Board of Secondary Education</p>
                    </div>
                    <div class="my-auto py-8 space-y-3">
                        <div class="border-y-2 border-black py-5">
                            <h1 class="text-2xl font-extrabold tracking-wide uppercase">ARTIFICIAL INTELLIGENCE</h1>
                            <p class="text-xs font-semibold tracking-widest mt-1">SUBJECT CODE: 417 • PRACTICAL FILE</p>
                        </div>
                        <p class="text-xs italic text-gray-600">A Practical Record File on Data Science with Python & Orange Data Mining Tool</p>
                    </div>
                    <div class="grid grid-cols-2 text-left text-xs gap-4 border-t border-black pt-4 font-sans">
                        <div>
                            <p class="font-bold uppercase text-gray-500 text-[9pt]">Submitted By:</p>
                            <p><strong>Name:</strong> ${escapeHtml(state.meta.name)}</p>
                            <p><strong>Roll No:</strong> ${escapeHtml(state.meta.roll)}</p>
                            <p><strong>Class:</strong> ${escapeHtml(state.meta.className)}</p>
                            <p><strong>School:</strong> ${escapeHtml(state.meta.school)}</p>
                        </div>
                        <div class="text-right">
                            <p class="font-bold uppercase text-gray-500 text-[9pt]">Submitted To:</p>
                            <p><strong>Evaluator:</strong> ${escapeHtml(state.meta.teacher)}</p>
                            <p>Department of Computer Science & AI</p>
                        </div>
                    </div>
                </div>
            `;
        }
        container.appendChild(coverPage);
        currentPageNum++;
    }

    if (state.intro.showCert) {
        const certPage = document.createElement('div');
        certPage.className = "a4-page font-serif-doc text-justify leading-relaxed";
        certPage.style.fontSize = `${state.layout.fontSize}pt`;
        const cStyle = state.intro.certStyle || 'classic';
        let certInner = '';
        if (cStyle === 'ornate') {
            certInner = `
                <div class="flex-1 flex flex-col justify-between">
                    <div class="border-4 border-double border-black p-6 h-full flex flex-col justify-between">
                        <div class="space-y-5">
                            <h2 class="text-2xl font-bold text-center uppercase tracking-wider">Certificate of Excellence</h2>
                            <p class="mt-6">This is to certify that <strong>${escapeHtml(state.meta.name)}</strong>, a student of <strong>${escapeHtml(state.meta.className)}</strong> bearing Roll No <strong>${escapeHtml(state.meta.roll)}</strong>, has completed the AI (417) practical project for session <strong>${escapeHtml(state.meta.session)}</strong> with distinction.</p>
                            <p>All Python programs and Orange workflows have been verified and found satisfactory.</p>
                            <div class="grid grid-cols-2 gap-10 pt-20 text-center text-xs font-sans">
                                <div><p class="border-t border-black pt-2 font-bold">Teacher's Signature</p></div>
                                <div><p class="border-t border-black pt-2 font-bold">External Examiner</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else if (cStyle === 'minimal') {
            certInner = `
                <div class="flex-1 flex flex-col justify-between">
                    <div class="space-y-6 pt-10">
                        <h2 class="text-xl font-bold text-center uppercase tracking-wider">Certificate</h2>
                        <p class="mt-8">This is to certify that <strong>${escapeHtml(state.meta.name)}</strong> of <strong>${escapeHtml(state.meta.className)}</strong>, Roll No <strong>${escapeHtml(state.meta.roll)}</strong>, has successfully completed the AI (417) project file for session <strong>${escapeHtml(state.meta.session)}</strong>.</p>
                        <div class="grid grid-cols-2 gap-10 pt-24 text-center text-xs font-sans">
                            <div><p class="border-t border-gray-400 pt-2">Teacher</p></div>
                            <div><p class="border-t border-gray-400 pt-2">Examiner</p></div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            certInner = `
                <div class="flex-1 flex flex-col justify-between">
                    <div class="space-y-6">
                        <h2 class="text-xl font-bold text-center underline uppercase tracking-wider">Certificate of Authenticity</h2>
                        <p class="mt-8">This is to certify that <strong>${escapeHtml(state.meta.name)}</strong>, a student of class <strong>${escapeHtml(state.meta.className)}</strong> bearing Roll Number <strong>${escapeHtml(state.meta.roll)}</strong>, has successfully completed the practical coursework and project file requirements for <strong>Artificial Intelligence (Subject Code 417)</strong> as prescribed by the Central Board of Secondary Education (CBSE) for the academic session <strong>${escapeHtml(state.meta.session)}</strong>.</p>
                        <p>All Python data science programs and Orange tool predictive workflows contained in this record file represent authentic, original work executed by the student under supervision.</p>
                        <div class="grid grid-cols-2 gap-10 pt-24 text-center text-xs font-sans">
                            <div><p class="border-t border-black pt-2 font-bold">Internal / Teacher Signature</p></div>
                            <div><p class="border-t border-black pt-2 font-bold">External Examiner Signature</p></div>
                        </div>
                    </div>
                </div>
            `;
        }
        certPage.innerHTML = `
            ${certInner}
            ${state.layout.showHeaders ? `<div class="text-[8pt] font-sans text-gray-500 border-t border-gray-300 pt-2 flex justify-between"><span>Certificate</span><span>Page ${currentPageNum}</span></div>` : ''}
        `;
        container.appendChild(certPage);
        currentPageNum++;
    }

    if (state.intro.showAck) {
        const ackPage = document.createElement('div');
        ackPage.className = "a4-page font-serif-doc text-justify leading-relaxed";
        ackPage.style.fontSize = `${state.layout.fontSize}pt`;
        const aStyle = state.intro.ackStyle || 'classic';
        let ackInner = '';
        if (aStyle === 'formal') {
            ackInner = `
                <div class="flex-1 flex flex-col justify-between">
                    <div class="space-y-6">
                        <h2 class="text-xl font-bold text-center uppercase tracking-wider">Acknowledgement</h2>
                        <p class="mt-8">I would like to express my sincere gratitude to my teacher <strong>${escapeHtml(state.meta.teacher)}</strong> and the Principal for their guidance and support throughout this project.</p>
                        <p>I also thank my parents and friends for their encouragement during the compilation of this practical file.</p>
                        <div class="text-right pt-12 font-sans text-xs">
                            <p class="font-bold">${escapeHtml(state.meta.name)}</p>
                            <p>Roll No: ${escapeHtml(state.meta.roll)}</p>
                        </div>
                    </div>
                </div>
            `;
        } else {
            ackInner = `
                <div class="flex-1 flex flex-col justify-between">
                    <div class="space-y-6">
                        <h2 class="text-xl font-bold text-center underline uppercase tracking-wider">Acknowledgement</h2>
                        <p class="mt-8">I wish to express my deep sense of gratitude to my Artificial Intelligence teacher <strong>${escapeHtml(state.meta.teacher)}</strong> and our Principal for providing the necessary guidance, laboratory facilities, and encouragement throughout this practical project.</p>
                        <p>I am also thankful to my parents and fellow classmates for their helpful suggestions and support while compiling these practical records.</p>
                        <div class="text-right pt-12 font-sans text-xs">
                            <p class="font-bold">${escapeHtml(state.meta.name)}</p>
                            <p>Roll No: ${escapeHtml(state.meta.roll)}</p>
                        </div>
                    </div>
                </div>
            `;
        }
        ackPage.innerHTML = `
            ${ackInner}
            ${state.layout.showHeaders ? `<div class="text-[8pt] font-sans text-gray-500 border-t border-gray-300 pt-2 flex justify-between"><span>Acknowledgement</span><span>Page ${currentPageNum}</span></div>` : ''}
        `;
        container.appendChild(ackPage);
        currentPageNum++;
    }

    if (state.intro.showIndex) {
        const indexPage = document.createElement('div');
        indexPage.className = "a4-page font-sans";
        indexPage.style.fontSize = `${state.layout.fontSize}pt`;
        let indexRowsHTML = '';
        state.records.forEach((rec, idx) => {
            const pageNo = recordStartPages[idx] || (currentPageNum + 1);
            indexRowsHTML += `
                <tr class="border-b border-gray-300 text-[9pt]">
                    <td class="p-1.5 font-bold text-center border-r border-gray-300">${idx + 1}</td>
                    <td class="p-1.5 border-r border-gray-300 font-medium">${escapeHtml(rec.title)}</td>
                    <td class="p-1.5 text-center border-r border-gray-300 font-mono text-[8pt] uppercase">${rec.type}</td>
                    <td class="p-1.5 text-center font-semibold font-mono">${pageNo}</td>
                </tr>
            `;
        });
        indexPage.innerHTML = `
            <div>
                <h2 class="text-lg font-bold text-center underline uppercase tracking-wider mb-4 font-serif-doc">Practical Index Sheet</h2>
                <table class="w-full border-collapse border border-black text-left">
                    <thead>
                        <tr class="bg-gray-100 border-b border-black text-[9pt] font-bold uppercase">
                            <th class="p-1.5 border-r border-black w-10 text-center">S.No</th>
                            <th class="p-1.5 border-r border-black">Practical / Task Description</th>
                            <th class="p-1.5 border-r border-black w-24 text-center">Tool</th>
                            <th class="p-1.5 w-20 text-center">Page No</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${indexRowsHTML || '<tr><td colspan="4" class="p-4 text-center text-gray-500">No records loaded.</td></tr>'}
                    </tbody>
                </table>
            </div>
            ${state.layout.showHeaders ? `<div class="text-[8pt] text-gray-500 border-t border-gray-300 pt-2 flex justify-between"><span>Index</span><span>Page ${currentPageNum}</span></div>` : ''}
        `;
        container.appendChild(indexPage);
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
                ${state.layout.showHeaders ? `<div class="text-[8pt] text-gray-500 border-t border-gray-300 pt-1.5 flex justify-between"><span>Subject Code 417 • AI Project File</span><span>Page ${currentPageNum}</span></div>` : ''}
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
                    ${!isPython && rec.datasetDesc ? `
                    <div>
                        <strong class="text-[9pt] text-gray-900">Dataset Description:</strong>
                        <p class="text-[8.5pt] text-gray-800 mt-0.5">${escapeHtml(rec.datasetDesc)}</p>
                    </div>` : ''}
                </div>`;

            let sec2 = `
                <div class="record-block border border-black rounded p-2.5 bg-white space-y-2 text-justify" data-recidx="${recIdx}">
                    <div class="text-[9pt] font-bold text-gray-900 border-b border-gray-300 pb-1">
                        ${escapeHtml(rec.title)} — <span class="text-[8pt] font-normal">${isPython ? 'Source Code' : 'Workflow Pipeline'}</span>
                    </div>
                    ${rec.code ? `<div class="doc-box font-code mt-1" style="font-size: ${state.layout.codeSize}pt">${escapeHtml(rec.code)}</div>` : ''}
                    ${rec.codeImg ? `<div class="img-preview-box my-1" style="max-height: ${state.layout.imgHeight}px"><img src="${rec.codeImg}" style="max-height: ${state.layout.imgHeight}px; width: ${imgScale * 100}%" alt="Code SS"></div>` : ''}
                </div>`;

            let sec3 = `
                <div class="record-block border border-black rounded p-2.5 bg-white space-y-2 text-justify" data-recidx="${recIdx}">
                    <div class="text-[9pt] font-bold text-gray-900 border-b border-gray-300 pb-1">
                        ${escapeHtml(rec.title)} — <span class="text-[8pt] font-normal">${isPython ? 'Output / Result' : 'Prediction Output'}</span>
                    </div>
                    ${!isPython && rec.dataImg ? `
                    <div>
                        <strong class="text-[9pt] text-gray-900">Data Table Screenshot:</strong>
                        <div class="img-preview-box my-1" style="max-height: ${state.layout.imgHeight}px"><img src="${rec.dataImg}" style="max-height: ${state.layout.imgHeight}px; width: ${imgScale * 100}%" alt="Data SS"></div>
                    </div>` : ''}
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
                        ${!isPython && rec.datasetDesc ? `
                        <div>
                            <strong class="text-[9pt] text-gray-900">Dataset Description:</strong>
                            <p class="text-[8.5pt] text-gray-800 mt-0.5">${escapeHtml(rec.datasetDesc)}</p>
                        </div>` : ''}
                        <div>
                            <strong class="text-[9pt] text-gray-900">${isPython ? 'Source Code:' : 'Orange Workflow Pipeline Schema:'}</strong>
                            ${rec.code ? `<div class="doc-box font-code mt-1" style="font-size: ${state.layout.codeSize}pt">${escapeHtml(rec.code)}</div>` : ''}
                            ${rec.codeImg ? `<div class="img-preview-box my-1" style="max-height: ${state.layout.imgHeight}px"><img src="${rec.codeImg}" style="max-height: ${state.layout.imgHeight}px; width: ${imgScale * 100}%" alt="Code SS"></div>` : ''}
                        </div>
                        ${!isPython && rec.dataImg ? `
                        <div>
                            <strong class="text-[9pt] text-gray-900">Data Table Screenshot:</strong>
                            <div class="img-preview-box my-1" style="max-height: ${state.layout.imgHeight}px"><img src="${rec.dataImg}" style="max-height: ${state.layout.imgHeight}px; width: ${imgScale * 100}%" alt="Data SS"></div>
                        </div>` : ''}
                        <div>
                            <strong class="text-[9pt] text-gray-900">${isPython ? 'Output / Result:' : 'Prediction / Classification Output SS:'}</strong>
                            ${rec.output ? `<div class="doc-box font-code mt-1" style="font-size: ${state.layout.codeSize}pt">${escapeHtml(rec.output)}</div>` : ''}
                            ${rec.outputImg ? `<div class="img-preview-box my-1" style="max-height: ${state.layout.imgHeight}px"><img src="${rec.outputImg}" style="max-height: ${state.layout.imgHeight}px; width: ${imgScale * 100}%" alt="Output SS"></div>` : ''}
                        </div>
                    </div>
                `;
            });
            chunkHTML += `</div>`;
            pageEl.innerHTML = `
                ${chunkHTML}
                ${state.layout.showHeaders ? `<div class="text-[8pt] text-gray-500 border-t border-gray-300 pt-1.5 flex justify-between"><span>Subject Code 417 • AI Project File</span><span>Page ${currentPageNum}</span></div>` : ''}
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
                    <div class="blk-sec"><span class="blk-lbl" style="font-size:${fs - 1}pt">${py ? 'Question / Problem Statement:' : 'Task Objective:'}</span><p class="blk-txt" style="font-size:${fs - 1}pt">${esc(rec.question)}</p></div>
                    ${!py && rec.datasetDesc ? `<div class="blk-sec" style="padding-top:0"><span class="blk-lbl" style="font-size:${fs - 1}pt">Dataset Description:</span><p class="blk-txt" style="font-size:${fs - 1.5}pt">${esc(rec.datasetDesc)}</p></div>` : ''}</div>`;
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
            if (rec.code) list.push({ kind: 'text', rec: ri, label: py ? 'Source Code:' : 'Orange Workflow Pipeline Schema:', text: rec.code });
            if (rec.codeImg) list.push(imgBlock(ri, rec.codeImg, py ? 'Code Screenshot:' : 'Pipeline Screenshot:', rec.imgWidthPct));
            if (!py && rec.dataImg) list.push(imgBlock(ri, rec.dataImg, 'Data Table Screenshot:', rec.imgWidthPct));
            if (rec.output) list.push({ kind: 'text', rec: ri, label: py ? 'Output / Result:' : 'Prediction / Classification Output:', text: rec.output });
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
        const ROWS = 26;
        const idxPages = I.showIndex ? Math.max(1, Math.ceil(state.records.length / ROWS)) : 0;
        const startNum = introCount + idxPages + 1;
        const foot = (l, n) => L.showHeaders ? `<div class="page-footer"><span>${l}</span><span>Page ${n}</span></div>` : '';

        const domPage = {};
        const buildIndex = () => { const firstRec = container.querySelector('.rec-page[data-rec]');
        for (let p = 0; p < idxPages; p++) {
            const rows = state.records.slice(p * ROWS, (p + 1) * ROWS).map((rec, k) => {
                const i = p * ROWS + k;
                return `<tr style="border-bottom:1px solid #d1d5db;font-size:9pt"><td style="padding:5px;text-align:center;font-weight:700;border-right:1px solid #d1d5db">${i + 1}</td><td style="padding:5px;border-right:1px solid #d1d5db">${esc(rec.title)}</td><td style="padding:5px;text-align:center;border-right:1px solid #d1d5db;text-transform:uppercase;font-size:8pt">${rec.type}</td><td style="padding:5px;text-align:center;font-weight:600">${startNum + (domPage[i] || 0)}</td></tr>`;
            }).join('');
            const el = document.createElement('div');
            el.className = 'a4-page rec-page';
            el.innerHTML = `<div class="page-body"><h2 style="font:700 14pt 'Times New Roman',serif;text-align:center;text-decoration:underline;text-transform:uppercase;margin-bottom:12px">Practical Index Sheet${idxPages > 1 ? ` (${p + 1}/${idxPages})` : ''}</h2>
                <table style="width:100%;border-collapse:collapse;border:1px solid #000;color:#000"><thead><tr style="background:#f3f4f6;border-bottom:1px solid #000;font-size:9pt;text-transform:uppercase"><th style="padding:5px;width:40px">S.No</th><th style="padding:5px;text-align:left">Practical / Task Description</th><th style="padding:5px;width:80px">Tool</th><th style="padding:5px;width:70px">Page No</th></tr></thead>
                <tbody>${rows || '<tr><td colspan="4" style="padding:16px;text-align:center;color:#6b7280">No records loaded.</td></tr>'}</tbody></table></div>${foot('Index', introCount + p + 1)}`;
            container.insertBefore(el, firstRec || null);
        } };

        pages.filter(pg => pg.length).forEach((pg, pi) => {
            const el = document.createElement('div');
            el.className = 'a4-page rec-page'; el.dataset.rec = '1';
            el.innerHTML = `<div class="page-body">${pg.map((it, k) => `<div data-r="${it.b.rec}" style="margin-top:${k ? it.gap : 0}px">${it.html}</div>`).join('')}</div>${foot('Subject Code 417 • AI Project File', startNum + pi)}`;
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
                next.innerHTML = `<div class="page-body"></div>${foot('Subject Code 417 • AI Project File', 0)}`;
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
    window.triggerPrint = function () { clearTimeout(timer); run().then(() => window.print()); };
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