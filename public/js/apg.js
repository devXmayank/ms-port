
let state = {
    meta: {
        name: "-",
        roll: "-",
        className: "Class XII - Science (B)",
        school: "New St. Stephen Public School, Agra",
        teacher: "Mr. Ali Sir",
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
    layout: { density: 2, fontSize: 10, codeSize: 9, imgHeight: 160, showHeaders: true },
    records: []
};

let currentPresetCat = 'all';

const presetLibrary = [
    { id: 1, cat: "python", title: "Python Practical 1: Pandas DataFrame Creation & Inspection", q: "Write a Python program to create a Pandas DataFrame from a dictionary of student details and display the first 3 records.", code: "import pandas as pd\n\ndata = {\n    'Name': ['Aarav', 'Diya', 'Kabir', 'Ananya', 'Rohan'],\n    'Age': [17, 18, 17, 18, 17],\n    'Stream': ['Science', 'Commerce', 'Science', 'Humanities', 'Science'],\n    'Marks': [88, 92, 79, 85, 95]\n}\ndf = pd.DataFrame(data)\nprint('--- First 3 Records ---')\nprint(df.head(3))", output: "--- First 3 Records ---\n    Name  Age    Stream  Marks\n0  Aarav   17   Science     88\n1   Diya   18  Commerce     92\n2  Kabir   17   Science     79" },
    { id: 2, cat: "python", title: "Python Practical 2: Handling Missing Values (Mean Imputation)", q: "Write a Python program using Pandas to detect missing values in a dataset and fill them with column mean.", code: "import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\n    'Product': ['Laptop', 'Mouse', 'Keyboard', 'Monitor'],\n    'Price': [55000, np.nan, 1500, 12000],\n    'Stock': [10, 25, 50, np.nan]\n})\ndf['Price'].fillna(df['Price'].mean(), inplace=True)\ndf['Stock'].fillna(df['Stock'].mean(), inplace=True)\nprint(df)", output: "    Product         Price      Stock\n0    Laptop  55000.000000  10.000000\n1     Mouse  22833.333333  25.000000\n2  Keyboard   1500.000000  50.000000\n3   Monitor  12000.000000  28.333333" },
    { id: 3, cat: "python", title: "Python Practical 3: Conditional Data Querying & Filtering", q: "Write a Python program to filter employees in 'IT' department with Salary > 50,000.", code: "import pandas as pd\n\nemp = {\n    'Name': ['Amit', 'Priya', 'Rahul', 'Neha', 'Vikas'],\n    'Dept': ['IT', 'HR', 'IT', 'Finance', 'IT'],\n    'Salary': [45000, 60000, 75000, 50000, 82000]\n}\ndf = pd.DataFrame(emp)\nres = df[(df['Salary'] > 50000) & (df['Dept'] == 'IT')]\nprint(res)", output: "    Name Dept  Salary\n2  Rahul   IT   75000\n4  Vikas   IT   82000" },
    { id: 4, cat: "python", title: "Python Practical 4: Bar Chart Visualization with Matplotlib", q: "Write a Python program to plot a bar chart representing smartphone brand unit sales.", code: "import matplotlib.pyplot as plt\n\nbrands = ['Samsung', 'Apple', 'Xiaomi', 'OnePlus']\nsales = [4500, 3800, 5100, 2900]\n\nplt.bar(brands, sales, color='skyblue', edgecolor='black')\nplt.xlabel('Brands')\nplt.ylabel('Units Sold')\nplt.title('Smartphone Sales')\nplt.show()", output: "[Chart Output: Bar plot successfully generated displaying brand sales units.]" },
    { id: 5, cat: "python", title: "Python Practical 5: Age Frequency Distribution Histogram", q: "Write a Python program to plot a histogram showing age distribution among survey participants.", code: "import matplotlib.pyplot as plt\n\nages = [18, 22, 25, 21, 19, 24, 30, 35, 40, 22, 23, 27, 29, 31, 33]\nplt.hist(ages, bins=5, color='orange', edgecolor='black')\nplt.xlabel('Age Group')\nplt.ylabel('Frequency')\nplt.title('Age Histogram')\nplt.show()", output: "[Histogram Output: 5 frequency bins plotted across participant ages.]" },
    { id: 6, cat: "python", title: "Python Practical 6: Array Statistical Computation using NumPy", q: "Write a Python program using NumPy to compute mean, median, and standard deviation.", code: "import numpy as np\n\ndata = np.array([45, 88, 56, 90, 72, 64, 80, 95])\nprint('Mean:', np.mean(data))\nprint('Median:', np.median(data))\nprint('Std Dev:', round(np.std(data), 2))", output: "Mean: 73.75\nMedian: 76.0\nStd Dev: 15.65" },
    { id: 7, cat: "python", title: "Python Practical 7: Regional Revenue Aggregation using Groupby", q: "Write a Python program to group sales data by Region and compute total sum.", code: "import pandas as pd\n\ndata = {'Region': ['North', 'South', 'North', 'East', 'South'], 'Revenue': [2500, 4200, 3100, 1500, 4800]}\ndf = pd.DataFrame(data)\nsummary = df.groupby('Region')['Revenue'].sum()\nprint(summary)", output: "Region\nEast     1500\nNorth    5600\nSouth    9000\nName: Revenue, dtype: int64" },
    { id: 8, cat: "python", title: "Python Practical 8: Scikit-Learn Train-Test Splitting", q: "Write a Python program to split a dataset into 70% training and 30% testing subsets.", code: "from sklearn.model_selection import train_test_split\nimport numpy as np\n\nX = np.arange(20).reshape((10, 2))\ny = np.array([0, 0, 0, 0, 0, 1, 1, 1, 1, 1])\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=42)\nprint('X Train:', X_tr.shape)\nprint('X Test :', X_te.shape)", output: "X Train: (7, 2)\nX Test : (3, 2)" },
    { id: 9, cat: "python", title: "Python Practical 9: Study Hours vs Marks Correlation Scatter Plot", q: "Write a Python program to plot a scatter chart visualizing correlation between study hours and exam scores.", code: "import matplotlib.pyplot as plt\n\nhrs = [2, 3.5, 1, 5, 4.5, 3, 6, 2.5]\nscores = [50, 65, 30, 85, 80, 60, 95, 55]\nplt.scatter(hrs, scores, color='purple')\nplt.xlabel('Hours'); plt.ylabel('Marks')\nplt.grid(True); plt.show()", output: "[Scatter Plot Output: Linear positive trend line observed.]" },
    { id: 10, cat: "python", title: "Python Practical 10: Classification Model Metrics Computation", q: "Write a Python program to compute Accuracy, Precision, and Recall using sklearn.metrics.", code: "from sklearn.metrics import accuracy_score, precision_score, recall_score\n\ny_true = [1, 0, 1, 1, 0, 1, 0, 0, 1, 1]\ny_pred = [1, 0, 0, 1, 0, 1, 1, 0, 1, 1]\nprint(f'Accuracy : {accuracy_score(y_true, y_pred):.2f}')\nprint(f'Precision: {precision_score(y_true, y_pred):.2f}')\nprint(f'Recall   : {recall_score(y_true, y_pred):.2f}')", output: "Accuracy : 0.80\nPrecision: 0.83\nRecall   : 0.83" },
    { id: 11, cat: "python", title: "Python Practical 11: CSV File Import & Summary Statistics", q: "Write a Python program to read a CSV file into Pandas DataFrame and generate summary statistics.", code: "import pandas as pd\nfrom io import StringIO\ncsv_data = '''ID,Score,Age\n1,85,17\n2,90,18\n3,78,17'''\ndf = pd.read_csv(StringIO(csv_data))\nprint(df.describe())", output: "             ID      Score        Age\nmean   2.000000  84.333333  17.333333\nstd    1.000000   6.027714   0.577350" },
    { id: 12, cat: "python", title: "Python Practical 12: Categorical Feature Encoding (Label Encoding)", q: "Write a Python program to convert categorical text labels into numerical values using LabelEncoder.", code: "from sklearn.preprocessing import LabelEncoder\nimport pandas as pd\n\ndf = pd.DataFrame({'Color': ['Red', 'Blue', 'Green', 'Blue', 'Red']})\nle = LabelEncoder()\ndf['Color_Encoded'] = le.fit_transform(df['Color'])\nprint(df)", output: "   Color  Color_Encoded\n0    Red              2\n1   Blue              0\n2  Green              1\n3   Blue              0\n4    Red              2" },
    { id: 13, cat: "python", title: "Python Practical 13: Feature Scaling with MinMaxScaler", q: "Write a Python program using Scikit-Learn MinMaxScaler to scale numeric features between 0 and 1.", code: "from sklearn.preprocessing import MinMaxScaler\nimport numpy as np\n\ndata = np.array([[100], [200], [300], [400], [500]])\nscaler = MinMaxScaler()\nscaled = scaler.fit_transform(data)\nprint(scaled.flatten())", output: "[0.   0.25 0.5  0.75 1.  ]" },
    { id: 14, cat: "python", title: "Python Practical 14: Correlation Matrix Heatmap", q: "Write a Python program to compute and display a correlation matrix using Pandas.", code: "import pandas as pd\n\ndf = pd.DataFrame({'Study_Hrs': [2,4,6,8], 'Play_Hrs': [8,6,4,2], 'Marks': [50,65,80,95]})\ncorr = df.corr()\nprint(corr)", output: "           Study_Hrs  Play_Hrs  Marks\nStudy_Hrs        1.0      -1.0    1.0\nPlay_Hrs        -1.0       1.0   -1.0\nMarks            1.0      -1.0    1.0" },
    { id: 15, cat: "python", title: "Python Practical 15: Decision Tree Classification Script", q: "Write a Python program to build a Decision Tree Classifier on sample data.", code: "from sklearn.tree import DecisionTreeClassifier\nimport numpy as np\n\nX = [[1, 2], [2, 3], [3, 1], [4, 3]]\ny = [0, 0, 1, 1]\nclf = DecisionTreeClassifier()\nclf.fit(X, y)\nprint('Prediction for [3,2]:', clf.predict([[3, 2]]))", output: "Prediction for [3,2]: [1]" },
    { id: 16, cat: "python", title: "Python Practical 16: Linear Regression Line Fitting", q: "Write a Python program to fit a Linear Regression model and print slope and intercept.", code: "from sklearn.linear_model import LinearRegression\nimport numpy as np\n\nX = np.array([[1], [2], [3], [4], [5]])\ny = np.array([3, 5, 7, 9, 11])\nmodel = LinearRegression().fit(X, y)\nprint('Slope:', model.coef_[0])\nprint('Intercept:', model.intercept_)", output: "Slope: 2.0\nIntercept: 1.0" },
    { id: 17, cat: "python", title: "Python Practical 17: Confusion Matrix Generation", q: "Write a Python program to compute and display a confusion matrix for evaluation.", code: "from sklearn.metrics import confusion_matrix\n\ny_true = [1, 0, 1, 1, 0, 1]\ny_pred = [1, 0, 1, 0, 0, 1]\ncm = confusion_matrix(y_true, y_pred)\nprint('Confusion Matrix:\\n', cm)", output: "Confusion Matrix:\n [[2 0]\n [1 3]]" },
    { id: 18, cat: "python", title: "Python Practical 18: Box Plot for Outlier Identification", q: "Write a Python program to create a boxplot visualizing feature distribution and outliers.", code: "import matplotlib.pyplot as plt\n\ndata = [12, 15, 14, 10, 13, 11, 45]\nplt.boxplot(data)\nplt.title('Outlier Boxplot')\nplt.show()", output: "[Boxplot Output: Outlier marker plotted at value 45.]" },
    { id: 19, cat: "python", title: "Python Practical 19: One-Hot Encoding for Categorical Data", q: "Write a Python program to perform One-Hot Encoding using pd.get_dummies().", code: "import pandas as pd\n\ndf = pd.DataFrame({'City': ['Delhi', 'Mumbai', 'Delhi', 'Chennai']})\ndf_encoded = pd.get_dummies(df, columns=['City'])\nprint(df_encoded)", output: "   City_Chennai  City_Delhi  City_Mumbai\n0             0           1            0\n1             0           0            1\n2             0           1            0\n3             1           0            0" },
    { id: 20, cat: "python", title: "Python Practical 20: K-Means Clustering Implementation", q: "Write a Python program to cluster 2D data points into 2 clusters using KMeans.", code: "from sklearn.cluster import KMeans\nimport numpy as np\n\nX = np.array([[1, 2], [1, 4], [1, 0], [10, 2], [10, 4], [10, 0]])\nkmeans = KMeans(n_clusters=2, random_state=0).fit(X)\nprint('Cluster Labels:', kmeans.labels_)", output: "Cluster Labels: [1 1 1 0 0 0]" },
    { id: 21, cat: "python", title: "Python Practical 21: Naïve Bayes Classification", q: "Write a Python script to perform Gaussian Naïve Bayes classification.", code: "from sklearn.naive_bayes import GaussianNB\n\nX = [[-1, -1], [-2, -1], [-3, -2], [1, 1], [2, 1], [3, 2]]\nY = [1, 1, 1, 2, 2, 2]\nclf = GaussianNB().fit(X, Y)\nprint('Predict [-0.8, -1]:', clf.predict([[-0.8, -1]]))", output: "Predict [-0.8, -1]: [1]" },
    { id: 22, cat: "python", title: "Python Practical 22: k-Nearest Neighbors (k-NN) Classification", q: "Write a Python program to classify data using KNeighborsClassifier with k=3.", code: "from sklearn.neighbors import KNeighborsClassifier\n\nX = [[0], [1], [2], [3]]\ny = [0, 0, 1, 1]\nneigh = KNeighborsClassifier(n_neighbors=3).fit(X, y)\nprint('Predict [1.5]:', neigh.predict([[1.5]]))", output: "Predict [1.5]: [0]" },
    { id: 23, cat: "python", title: "Python Practical 23: Text CountVectorizer Extraction", q: "Write a Python program to extract word frequency vectors from text using CountVectorizer.", code: "from sklearn.feature_extraction.text import CountVectorizer\n\ncorpus = ['AI is future', 'Python for AI']\nvectorizer = CountVectorizer()\nX = vectorizer.fit_transform(corpus)\nprint('Vocabulary:', vectorizer.get_feature_names_out())", output: "Vocabulary: ['ai' 'for' 'future' 'is' 'python']" },
    { id: 24, cat: "python", title: "Python Practical 24: Random Forest Ensemble Script", q: "Write a Python program to classify data using RandomForestClassifier.", code: "from sklearn.ensemble import RandomForestClassifier\n\nX = [[0, 0], [1, 1]]\ny = [0, 1]\nclf = RandomForestClassifier(n_estimators=10).fit(X, y)\nprint('Predict [1,0]:', clf.predict([[1, 0]]))", output: "Predict [1,0]: [1]" },
    { id: 25, cat: "python", title: "Python Practical 25: Pie Chart Market Share Plot", q: "Write a Python program to create a pie chart representing OS market share.", code: "import matplotlib.pyplot as plt\n\nlabels = ['Android', 'iOS', 'Windows', 'Others']\nshares = [70, 25, 3, 2]\nplt.pie(shares, labels=labels, autopct='%1.1f%%')\nplt.title('OS Share')\nplt.show()", output: "[Pie Chart Output: Android 70%, iOS 25% sector visual.]" },
    { id: 26, cat: "python", title: "Python Practical 26: Pandas Series Operations & Filtering", q: "Write a Python program to create a Series and filter values greater than 50.", code: "import pandas as pd\n\ns = pd.Series([10, 55, 20, 85, 40])\nprint(s[s > 50])", output: "1    55\n3    85\ndtype: int64" },
    { id: 27, cat: "python", title: "Python Practical 27: Sorting DataFrame Records", q: "Write a Python program to sort a DataFrame by Marks in descending order.", code: "import pandas as pd\n\ndf = pd.DataFrame({'Student': ['A', 'B', 'C'], 'Marks': [78, 92, 85]})\nprint(df.sort_values(by='Marks', ascending=False))", output: "  Student  Marks\n1       B     92\n2       C     85\n0       A     78" },
    { id: 28, cat: "python", title: "Python Practical 28: Line Graph Comparison", q: "Write a Python program to plot multiple lines comparing yearly profits of two companies.", code: "import matplotlib.pyplot as plt\n\nyears = [2020, 2021, 2022, 2023]\nco1 = [10, 15, 22, 30]\nco2 = [8, 18, 20, 28]\nplt.plot(years, co1, label='Company A')\nplt.plot(years, co2, label='Company B')\nplt.legend(); plt.show()", output: "[Line Plot Output: Dual line graph comparing corporate growth.]" },
    { id: 29, cat: "python", title: "Python Practical 29: Standardizing Features with StandardScaler", q: "Write a Python program to standardize features to zero mean and unit variance.", code: "from sklearn.preprocessing import StandardScaler\nimport numpy as np\n\ndata = np.array([[10], [20], [30], [40], [50]])\nscaled = StandardScaler().fit_transform(data)\nprint('Mean:', round(scaled.mean(), 2))\nprint('Std :', round(scaled.std(), 2))", output: "Mean: 0.0\nStd : 1.0" },
    { id: 30, cat: "python", title: "Python Practical 30: DataFrame Merging & Joining", q: "Write a Python program to merge two DataFrames on a common key 'ID'.", code: "import pandas as pd\n\ndf1 = pd.DataFrame({'ID': [1, 2], 'Name': ['Aarav', 'Diya']})\ndf2 = pd.DataFrame({'ID': [1, 2], 'Score': [90, 85]})\nmerged = pd.merge(df1, df2, on='ID')\nprint(merged)", output: "   ID   Name  Score\n0   1  Aarav     90\n1   2   Diya     85" },
    { id: 31, cat: "python", title: "Python Practical 31: Mean Absolute Error (MAE) Calculation", q: "Write a Python program to compute Mean Absolute Error between actual and predicted targets.", code: "from sklearn.metrics import mean_absolute_error\n\ny_true = [3.0, -0.5, 2.0, 7.0]\ny_pred = [2.5, 0.0, 2.0, 8.0]\nprint('MAE:', mean_absolute_error(y_true, y_pred))", output: "MAE: 0.5" },
    { id: 32, cat: "python", title: "Python Practical 32: Detecting Outliers using Z-Score", q: "Write a Python program using SciPy to find outliers via Z-score thresholding.", code: "import numpy as np\nfrom scipy import stats\n\ndata = np.array([10, 12, 12, 13, 12, 11, 100])\nz = np.abs(stats.zscore(data))\nprint('Outlier indices (z > 2):', np.where(z > 2)[0])", output: "Outlier indices (z > 2): [6]" },
    { id: 33, cat: "python", title: "Python Practical 33: Multi-class Support Vector Machine (SVM)", q: "Write a Python program to classify data using SVC linear kernel.", code: "from sklearn.svm import SVC\n\nX = [[0, 0], [1, 1], [1, 0]]\ny = [0, 1, 1]\nclf = SVC(kernel='linear').fit(X, y)\nprint('Predict [0,1]:', clf.predict([[0, 1]]))", output: "Predict [0,1]: [0]" },
    { id: 34, cat: "python", title: "Python Practical 34: Generating Synthetic Classification Data", q: "Write a Python program using make_classification to generate dummy datasets.", code: "from sklearn.datasets import make_classification\n\nX, y = make_classification(n_samples=50, n_features=4, random_state=42)\nprint('Features matrix shape:', X.shape)\nprint('Target vector shape  :', y.shape)", output: "Features matrix shape: (50, 4)\nTarget vector shape  : (50,)" },
    { id: 35, cat: "python", title: "Python Practical 35: Principal Component Analysis (PCA) Reduction", q: "Write a Python program to reduce 4D feature set down to 2 dimensions using PCA.", code: "from sklearn.decomposition import PCA\nimport numpy as np\n\nX = np.random.rand(10, 4)\npca = PCA(n_components=2)\nX_r = pca.fit_transform(X)\nprint('Reduced Shape:', X_r.shape)", output: "Reduced Shape: (10, 2)" },
    { id: 36, cat: "orange", title: "Orange Task 1: Iris Species Classification (Decision Tree)", q: "Build an Orange visual workflow to classify flower species from the standard Iris dataset.", datasetDesc: "Iris Dataset: 150 instances, 4 numeric features (sepal length, sepal width, petal length, petal width) predicting 3 species.", code: "Workflow Pipeline Schema:\n[File: iris.tab] ---> [Data Table]\n                  ---> [Decision Tree Widget]\n                  ---> [Predictions Widget]", output: "Predictions Output (Sample 3 Records):\nIris-setosa    | Predicted: Iris-setosa    | Confidence: 100%\nIris-versicolor| Predicted: Iris-versicolor| Confidence: 98%\nIris-virginica | Predicted: Iris-virginica | Confidence: 95%" },
    { id: 37, cat: "orange", title: "Orange Task 2: Titanic Survival Classification (Logistic Regression)", q: "Construct an Orange workflow evaluating passenger survival probabilities using Logistic Regression.", datasetDesc: "Titanic Dataset: 2201 records covering Class, Age, Sex, and Survived target label.", code: "Workflow Pipeline Schema:\n[File: titanic.tab] ---> [Select Columns (Target: survived)]\n                     ---> [Logistic Regression]\n                     ---> [Test & Score] ---> [Predictions]", output: "Evaluation Score & Prediction Matrix:\nClassification Accuracy (CA): 0.791 | F1-Score: 0.776\nPassenger 1 (1st Class, Female) -> Predicted: Survived (89%)\nPassenger 2 (3rd Class, Male)   -> Predicted: Died (84%)" },
    { id: 38, cat: "orange", title: "Orange Task 3: Housing Price Prediction (k-NN Regression)", q: "Build an Orange predictive pipeline to estimate housing market prices using k-NN regression.", datasetDesc: "Boston Housing Dataset: Continuous median housing price prediction based on crime rates, room counts, and location.", code: "Workflow Pipeline Schema:\n[File: housing.tab] ---> [k-NN Regressor (k=5)]\n                    ---> [Predictions Widget]", output: "Numeric Regression Results (Sample Rows):\nActual Price: $24,000 | Predicted Price: $23,450\nActual Price: $21,600 | Predicted Price: $22,100\nActual Price: $34,700 | Predicted Price: $33,900" },
    { id: 39, cat: "orange", title: "Orange Task 4: Heart Disease Risk Screening (Naïve Bayes)", q: "Design an Orange diagnostic workflow to predict heart disease risk using Naïve Bayes classifier.", datasetDesc: "Heart Disease Dataset: Clinical parameters (age, cholesterol, max heart rate) predicting disease presence.", code: "Workflow Pipeline Schema:\n[File: heart_disease.tab] ---> [Naive Bayes]\n                          ---> [Confusion Matrix]\n                          ---> [Test & Score]", output: "Confusion Matrix Summary:\nTrue Positives: 138 | False Positives: 24\nTrue Negatives: 112 | False Negatives: 18\nOverall Model Accuracy: 85.6%" },
    { id: 40, cat: "orange", title: "Orange Task 5: Customer Churn Classification (Random Forest)", q: "Construct an Orange workflow using Random Forest ensemble model with ROC Analysis to evaluate churn.", datasetDesc: "Banking Customer Churn Dataset: Predict customer retention based on credit score, balance, and tenure.", code: "Workflow Pipeline Schema:\n[File: customer_churn] ---> [Random Forest (Trees=100)]\n                       ---> [ROC Analysis Widget]\n                       ---> [Predictions]", output: "Performance Metrics & Sample Output:\nAUC: 0.912 | Accuracy: 89.4%\nSample Customer 101 -> Predicted: Churn (Confidence: 91%)\nSample Customer 102 -> Predicted: Retain (Confidence: 88%)" },
    { id: 41, cat: "orange", title: "Orange Task 6: Data Preprocessing & Missing Value Imputation", q: "Design an Orange pipeline to clean missing data values using Impute widget.", datasetDesc: "Raw Sales Data: Contains 15% missing entries across revenue and customer age features.", code: "Workflow Pipeline Schema:\n[File: raw_data.tab] ---> [Impute Widget (Mean/Median)] ---> [Data Table]", output: "Imputation Summary:\n12 Missing revenue records substituted with Mean ($4,250).\n8 Missing age entries filled with Median age (28)." },
    { id: 42, cat: "orange", title: "Orange Task 7: Hierarchical Clustering & Dendrogram", q: "Construct an Orange visual clustering pipeline to create a hierarchical dendrogram of zoo animals.", datasetDesc: "Zoo Dataset: 101 animals with 16 categorical/numeric traits (hair, feathers, eggs, milk, legs).", code: "Workflow Pipeline Schema:\n[File: zoo.tab] ---> [Distances (Euclidean)] ---> [Hierarchical Clustering] ---> [Dendrogram]", output: "Hierarchical Clusters Discovered:\nCluster 1: Mammals (Lion, Tiger, Bear)\nCluster 2: Birds (Eagle, Penguin)\nCluster 3: Amphibians/Reptiles" },
    { id: 43, cat: "orange", title: "Orange Task 8: Support Vector Machine (SVM) Classification", q: "Build an Orange workflow classifying wine quality samples using Support Vector Machines.", datasetDesc: "Wine Classification Dataset: 178 samples with 13 chemical constituents (alcohol, malic acid, ash).", code: "Workflow Pipeline Schema:\n[File: wine.tab] ---> [SVM (RBF Kernel)] ---> [Test & Score] ---> [Predictions]", output: "SVM Model Results:\nAccuracy: 96.2% | Precision: 0.965 | Recall: 0.960\nSample Wine #12 -> Predicted Class: Cultivar 1 (99% confidence)" },
    { id: 44, cat: "orange", title: "Orange Task 9: Principal Component Analysis (PCA) Scatter Visualizer", q: "Design an Orange workflow to project high-dimensional data onto 2D space using PCA widget.", datasetDesc: "Iris Data (4D) projected onto 2 principal component axes for 2D spatial clustering.", code: "Workflow Pipeline Schema:\n[File: iris.tab] ---> [PCA (Components=2)] ---> [Scatter Plot]", output: "PCA Variance Explained:\nPC1 explains 72.9% variance.\nPC2 explains 22.8% variance.\nScatter Plot visually separates setosa cluster cleanly." },
    { id: 45, cat: "orange", title: "Orange Task 10: Linear Regression Output & Feature Coefficients", q: "Construct an Orange workflow to fit a Linear Regression model for predicting vehicle fuel efficiency.", datasetDesc: "Auto MPG Dataset: Cylinders, displacement, horsepower predicting miles per gallon (MPG).", code: "Workflow Pipeline Schema:\n[File: auto-mpg.tab] ---> [Linear Regression]\n                         ---> [Data Table (Coefficients)]", output: "Regression Equations & Coefficients:\nBase Intercept: 34.2 MPG\nWeight Coefficient: -0.006 MPG per lb\nHorsepower Coefficient: -0.045 MPG per HP" },
    { id: 46, cat: "orange", title: "Orange Task 11: Feature Selection & Rank Widget", q: "Build an Orange workflow utilizing the Rank widget to identify most informative dataset attributes.", datasetDesc: "Adult Income Dataset: Evaluate feature importance for predicting salary > $50k.", code: "Workflow Pipeline Schema:\n[File: adult.tab] ---> [Rank Widget (Information Gain)] ---> [Data Table]", output: "Top 3 Ranked Features:\n1. Capital Gain (Info Gain Score: 0.214)\n2. Education-Num (Info Gain Score: 0.185)\n3. Marital Status (Info Gain Score: 0.172)" },
    { id: 47, cat: "orange", title: "Orange Task 12: k-Means Visual Clustering Pipeline", q: "Construct an Orange visual clustering setup grouping customer segments using k-Means widget.", datasetDesc: "Mall Customers Dataset: Annual Income vs Spending Score attributes.", code: "Workflow Pipeline Schema:\n[File: customers.tab] ---> [k-Means (k=3)] ---> [Silhouette Plot] ---> [Scatter Plot]", output: "Clustering Performance:\nOptimal k=3 clusters confirmed via Silhouette Score 0.58.\nCluster 0: Low Income, Low Spending\nCluster 1: High Income, High Spending" },
    { id: 48, cat: "orange", title: "Orange Task 13: Outlier Detection Workflow", q: "Build an Orange workflow identifying anomalous data points using Outliers widget.", datasetDesc: "Financial Transaction Logs: Detect potential fraudulent transaction outliers.", code: "Workflow Pipeline Schema:\n[File: transactions.tab] ---> [Outliers (Local Outlier Factor)] ---> [Data Table]", output: "Outlier Analysis Output:\nOutliers Detected: 14 out of 1000 records.\nFlagged Record ID 402: Extreme transfer amount ($98,000)." },
    { id: 49, cat: "orange", title: "Orange Task 14: Neural Network Classifier Workflow", q: "Design an Orange workflow predicting student course completion using Multi-layer Perceptron Neural Network.", datasetDesc: "Student Performance Dataset: Attendance, test scores, assignments predicting Pass/Fail.", code: "Workflow Pipeline Schema:\n[File: student_perf.tab] ---> [Neural Network (100 hidden neurons)] ---> [Test & Score]", output: "Neural Network Score:\nClassification Accuracy: 91.5%\nAUC: 0.942\nTest Sample #44 -> Predicted Result: PASS (94% prob)" },
    { id: 50, cat: "orange", title: "Orange Task 15: Cross-Validation Benchmark Comparison", q: "Construct an Orange benchmark setup comparing Decision Tree, SVM, and Naïve Bayes using 10-fold CV.", datasetDesc: "Breast Cancer Diagnostic Dataset: Benchmark 3 models across 569 patient records.", code: "Workflow Pipeline Schema:\n[File: cancer_data] ---> [Decision Tree]    ---\n                    ---> [SVM]              ---> [Test & Score (10-fold CV)]\n                    ---> [Naive Bayes]     ---", output: "Model Evaluation Benchmark Leaderboard:\n1. SVM           | CA: 0.972 | AUC: 0.991\n2. Naïve Bayes   | CA: 0.942 | AUC: 0.985\n3. Decision Tree | CA: 0.925 | AUC: 0.930" }
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
    state.layout.density = parseInt(document.getElementById('setting-density').value);
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
            document.getElementById('setting-density').value = state.layout.density || 2;
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
    const tempRecords = [...state.records];
    while (tempRecords.length > 0) {
        const chunk = tempRecords.splice(0, state.layout.density);
        chunk.forEach(() => { recordStartPages.push(tempPageCounter); });
        tempPageCounter++;
    }

    // COVER PAGE
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

    // CERTIFICATE PAGE
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
                        <p class="mt-8">This is to certify that <strong>${escapeHtml(state.meta.name)}</strong>, a student of class <strong>${escapeHtml(state.meta.className)}</strong> bearing CBSE Roll Number <strong>${escapeHtml(state.meta.roll)}</strong>, has successfully completed the practical coursework and project file requirements for <strong>Artificial Intelligence (Subject Code 417)</strong> as prescribed by the Central Board of Secondary Education (CBSE) for the academic session <strong>${escapeHtml(state.meta.session)}</strong>.</p>
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

    // ACKNOWLEDGEMENT PAGE
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
                            <p>CBSE Roll No: ${escapeHtml(state.meta.roll)}</p>
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

    // INDEX PAGE
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

    // PRACTICAL RECORDS PAGES
    const density = state.layout.density;
    const recordsCopy = [...state.records];
    while (recordsCopy.length > 0) {
        const chunk = recordsCopy.splice(0, density);
        const pageEl = document.createElement('div');
        pageEl.className = "a4-page font-sans";
        pageEl.style.fontSize = `${state.layout.fontSize}pt`;
        let chunkHTML = `<div class="space-y-4 flex-1">`;
        chunk.forEach((rec) => {
            const isPython = rec.type === 'python';
            const imgScale = (rec.imgWidthPct || 100) / 100;
            chunkHTML += `
                <div class="border border-black rounded p-2.5 bg-white space-y-2 text-justify">
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
                    </div>
                    ` : ''}
                    <div>
                        <strong class="text-[9pt] text-gray-900">${isPython ? 'Source Code:' : 'Orange Workflow Pipeline Schema:'}</strong>
                        ${rec.code ? `<div class="doc-box font-code mt-1" style="font-size: ${state.layout.codeSize}pt">${escapeHtml(rec.code)}</div>` : ''}
                        ${rec.codeImg ? `<div class="img-preview-box my-1" style="max-height: ${state.layout.imgHeight}px"><img src="${rec.codeImg}" style="max-height: ${state.layout.imgHeight}px; width: ${imgScale * 100}%" alt="Code SS"></div>` : ''}
                    </div>
                    ${!isPython && rec.dataImg ? `
                    <div>
                        <strong class="text-[9pt] text-gray-900">Data Table Screenshot:</strong>
                        <div class="img-preview-box my-1" style="max-height: ${state.layout.imgHeight}px"><img src="${rec.dataImg}" style="max-height: ${state.layout.imgHeight}px; width: ${imgScale * 100}%" alt="Data SS"></div>
                    </div>
                    ` : ''}
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