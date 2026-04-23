/* ============================================================
   DATA.JS — AIML Academy — Edit this file to add content
   ============================================================ */

/* =================== ROADMAP =================== */
const ROADMAP = [
  { phase:1, label:"PHASE_01", title:"Python & Math Foundations", color:"cyan", duration:"Weeks 1–4",
    weeks:[
      { num:1, title:"Python Bootcamp", topics:["Variables & Types","Control Flow","Functions","Loops","String Methods"], xp:100, resources:["https://docs.python.org/3/tutorial/","https://realpython.com"] },
      { num:2, title:"Data Structures", topics:["Lists","Dicts","Sets","Tuples","List Comprehensions","Nested Structures"], xp:120, resources:["https://docs.python.org/3/tutorial/datastructures.html"] },
      { num:3, title:"OOP & Advanced Python", topics:["Classes","Inheritance","Decorators","Generators","File I/O","Context Managers"], xp:140, resources:["https://realpython.com/python3-object-oriented-programming/"] },
      { num:4, title:"Math for ML", topics:["Linear Algebra","Calculus Basics","Statistics","Probability","NumPy Intro","Matrix Ops"], xp:160, resources:["https://www.3blue1brown.com/topics/linear-algebra","https://numpy.org/learn/"] }
    ]
  },
  { phase:2, label:"PHASE_02", title:"Core ML & Data Science", color:"green", duration:"Weeks 5–9",
    weeks:[
      { num:5, title:"NumPy & Pandas", topics:["Array Ops","DataFrames","Merging","Groupby","EDA","Missing Data"], xp:160, resources:["https://pandas.pydata.org/docs/getting_started/","https://numpy.org/doc/stable/user/quickstart.html"] },
      { num:6, title:"Data Visualization", topics:["Matplotlib","Seaborn","Plotly","EDA Workflows","Statistical Charts"], xp:140, resources:["https://matplotlib.org/stable/tutorials/","https://seaborn.pydata.org/tutorial.html"] },
      { num:7, title:"Supervised Learning", topics:["Linear Reg","Logistic Reg","SVM","Decision Trees","Random Forest","Gradient Boosting"], xp:200, resources:["https://scikit-learn.org/stable/supervised_learning.html"] },
      { num:8, title:"Unsupervised + Evaluation", topics:["K-Means","DBSCAN","PCA","Cross-Validation","GridSearchCV","Model Metrics"], xp:200, resources:["https://scikit-learn.org/stable/unsupervised_learning.html"] },
      { num:9, title:"Deep Learning Foundations", topics:["Neural Nets","Backprop","Activation Fns","Keras","TensorFlow","CNNs Intro"], xp:250, resources:["https://keras.io/getting_started/","https://www.tensorflow.org/tutorials"] }
    ]
  },
  { phase:3, label:"PHASE_03", title:"Advanced AI & Job Ready", color:"amber", duration:"Weeks 10–12",
    weeks:[
      { num:10, title:"CV & NLP", topics:["OpenCV","YOLOv8","Transformers","BERT","HuggingFace","LangChain","RAG"], xp:280, resources:["https://huggingface.co/learn","https://docs.ultralytics.com"] },
      { num:11, title:"MLOps & Deployment", topics:["FastAPI","Docker","MLflow","GitHub Actions","Streamlit","GCP/AWS Basics"], xp:300, resources:["https://fastapi.tiangolo.com","https://mlflow.org/docs/latest/index.html"] },
      { num:12, title:"Interview Prep & Portfolio", topics:["DSA (LeetCode)","ML Theory QnA","System Design","Resume","Mock Interviews","GitHub Portfolio"], xp:350, resources:["https://leetcode.com","https://www.interviewquery.com"] }
    ]
  }
];

/* =================== ALL PROBLEMS (200 total) =================== */
const ALL_PROBLEMS = [

  /* ── PYTHON BASICS (coding) ── */
  { id:"b01", group:"Python Basics", type:"coding", name:"Print Patterns", diff:"easy", xp:10,
    problem:"Star Pattern Printer",
    desc:"Print a star pyramid and its reverse using loops:\n*\n**\n***\n****\n*****\n****\n***\n**\n*",
    starter:"for i in range(1, 6):\n    pass\nfor i in range(4, 0, -1):\n    pass",
    solution:"for i in range(1, 6):\n    print('*' * i)\nfor i in range(4, 0, -1):\n    print('*' * i)",
    hint:"Use range() and string multiplication: '*' * n", examples:"" },

  { id:"b02", group:"Python Basics", type:"coding", name:"Fibonacci Generator", diff:"easy", xp:15,
    problem:"Fibonacci — Iterative, Recursive & Generator",
    desc:"1) fibonacci(n) returning first n Fibonacci numbers as a list.\n2) A generator fib_gen() yielding Fibonacci numbers infinitely.\n3) Print first 15 from the generator using itertools.islice.",
    starter:"import itertools\n\ndef fibonacci(n):\n    pass\n\ndef fib_gen():\n    a, b = 0, 1\n    while True:\n        pass\n\nprint(fibonacci(10))\nprint(list(itertools.islice(fib_gen(), 15)))",
    solution:"import itertools\n\ndef fibonacci(n):\n    a, b, result = 0, 1, []\n    for _ in range(n):\n        result.append(a)\n        a, b = b, a + b\n    return result\n\ndef fib_gen():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\nprint(fibonacci(10))\nprint(list(itertools.islice(fib_gen(), 15)))",
    hint:"Generator uses yield. Update both values: a, b = b, a+b", examples:"fibonacci(5) -> [0,1,1,2,3]" },

  { id:"b03", group:"Python Basics", type:"coding", name:"FizzBuzz Pro", diff:"easy", xp:15,
    problem:"Generalised FizzBuzz",
    desc:"Part 1: Classic FizzBuzz 1-50.\nPart 2: fizzbuzz(n, rules) where rules = {3:'Fizz', 5:'Buzz', 7:'Bazz'}.\nPrint 1..n applying all matching rules concatenated.",
    starter:"for i in range(1, 51):\n    pass\n\ndef fizzbuzz(n, rules):\n    pass\n\nfizzbuzz(21, {3: 'Fizz', 7: 'Bazz'})",
    solution:"for i in range(1, 51):\n    out = ''\n    if i % 3 == 0: out += 'Fizz'\n    if i % 5 == 0: out += 'Buzz'\n    print(out or i)\n\ndef fizzbuzz(n, rules):\n    for i in range(1, n + 1):\n        out = ''.join(v for k, v in rules.items() if i % k == 0)\n        print(out or i)\n\nfizzbuzz(21, {3: 'Fizz', 7: 'Bazz'})",
    hint:"Build output string by checking each divisor. Print number if out is empty.", examples:"" },

  { id:"b04", group:"Python Basics", type:"coding", name:"Number Classifier", diff:"easy", xp:15,
    problem:"Prime, Armstrong & Perfect Numbers",
    desc:"Write three functions: is_prime(n), is_armstrong(n) (e.g. 153=1^3+5^3+3^3), is_perfect(n) (e.g. 6=1+2+3).\nPrint all such numbers under 500.",
    starter:"def is_prime(n): pass\ndef is_armstrong(n): pass\ndef is_perfect(n): pass\n\nfor n in range(2, 500):\n    tags = []\n    if is_prime(n): tags.append('prime')\n    if is_armstrong(n): tags.append('armstrong')\n    if is_perfect(n): tags.append('perfect')\n    if tags: print(f'{n}: {tags}')",
    solution:"def is_prime(n):\n    if n < 2: return False\n    for i in range(2, int(n**0.5)+1):\n        if n % i == 0: return False\n    return True\n\ndef is_armstrong(n):\n    d = str(n); p = len(d)\n    return sum(int(x)**p for x in d) == n\n\ndef is_perfect(n):\n    return n > 1 and sum(i for i in range(1, n) if n % i == 0) == n\n\nfor n in range(2, 500):\n    tags = []\n    if is_prime(n): tags.append('prime')\n    if is_armstrong(n): tags.append('armstrong')\n    if is_perfect(n): tags.append('perfect')\n    if tags: print(f'{n}: {tags}')",
    hint:"Prime: check divisors up to sqrt(n). Armstrong: sum of (digit^num_digits).", examples:"" },

  { id:"b05", group:"Python Basics", type:"coding", name:"Lambda & Functional", diff:"easy", xp:15,
    problem:"Functional Programming Toolkit",
    desc:"Using ONLY lambda, map, filter, reduce:\n1. Square all even numbers in [1..20]\n2. Filter strings longer than 4 chars\n3. Product of [1..10] using reduce\n4. Sort list of dicts by 'age'",
    starter:"from functools import reduce\nnums = list(range(1, 21))\nwords = ['python','ai','ml','data','science','cat']\npeople = [{'name':'Alice','age':30},{'name':'Bob','age':25}]\n\n# 1. Even squares\n# 2. Long words\n# 3. Product\n# 4. Sort by age",
    solution:"from functools import reduce\nnums = list(range(1, 21))\nwords = ['python','ai','ml','data','science','cat']\npeople = [{'name':'Alice','age':30},{'name':'Bob','age':25}]\n\nprint(list(map(lambda x: x**2, filter(lambda x: x%2==0, nums))))\nprint(list(filter(lambda w: len(w)>4, words)))\nprint(reduce(lambda a, b: a*b, range(1, 11)))\nprint(sorted(people, key=lambda p: p['age']))",
    hint:"Combine map() and filter(). reduce(lambda a,b: a*b, ...) for product.", examples:"" },

  { id:"b06", group:"Python Basics", type:"coding", name:"Recursion", diff:"medium", xp:25,
    problem:"Tower of Hanoi + Deep Flatten",
    desc:"1. Tower of Hanoi for n=3 disks — print all moves.\n2. flatten(nested) that works at any depth: [[1,[2,[3]]],4] -> [1,2,3,4]\n3. power(base, exp) recursively without ** operator.",
    starter:"def hanoi(n, src, dst, aux): pass\ndef flatten(lst): pass\ndef power(base, exp): pass\n\nhanoi(3, 'A', 'C', 'B')\nprint(flatten([[1,[2,[3,[4]]]],5]))\nprint(power(2, 10))",
    solution:"def hanoi(n, src, dst, aux):\n    if n == 1: print(f'Move disk 1 from {src} to {dst}'); return\n    hanoi(n-1, src, aux, dst)\n    print(f'Move disk {n} from {src} to {dst}')\n    hanoi(n-1, aux, dst, src)\n\ndef flatten(lst):\n    result = []\n    for item in lst:\n        if isinstance(item, list): result.extend(flatten(item))\n        else: result.append(item)\n    return result\n\ndef power(base, exp):\n    if exp == 0: return 1\n    if exp % 2 == 0: return power(base, exp//2) ** 2\n    return base * power(base, exp-1)\n\nhanoi(3, 'A', 'C', 'B')\nprint(flatten([[1,[2,[3,[4]]]],5]))\nprint(power(2, 10))",
    hint:"Hanoi: move n-1 to aux, move n to dst, move n-1 from aux to dst.", examples:"" },

  { id:"b07", group:"Python Basics", type:"coding", name:"Decorators", diff:"medium", xp:30,
    problem:"Build Three Useful Decorators",
    desc:"1. @timer — measures execution time\n2. @retry(n) — retries on exception n times\n3. @memoize — caches results manually (no functools.cache)\n\nTest each with a sample function.",
    starter:"import time, functools\n\ndef timer(func): pass\ndef retry(n):\n    def decorator(func): pass\n    return decorator\ndef memoize(func): pass\n\n@timer\ndef slow(): time.sleep(0.05); return 42\n\n@memoize\ndef fib(n):\n    if n < 2: return n\n    return fib(n-1) + fib(n-2)\n\nprint(slow())\nprint(fib(35))",
    solution:"import time, functools\n\ndef timer(func):\n    @functools.wraps(func)\n    def wrapper(*a, **kw):\n        t = time.perf_counter()\n        r = func(*a, **kw)\n        print(f'{func.__name__} took {time.perf_counter()-t:.4f}s')\n        return r\n    return wrapper\n\ndef retry(n):\n    def decorator(func):\n        @functools.wraps(func)\n        def wrapper(*a, **kw):\n            for i in range(n):\n                try: return func(*a, **kw)\n                except Exception as e:\n                    if i == n-1: raise\n                    print(f'Retry {i+1}: {e}')\n        return wrapper\n    return decorator\n\ndef memoize(func):\n    cache = {}\n    @functools.wraps(func)\n    def wrapper(*a):\n        if a not in cache: cache[a] = func(*a)\n        return cache[a]\n    return wrapper\n\n@timer\ndef slow(): time.sleep(0.05); return 42\n\n@memoize\ndef fib(n):\n    if n < 2: return n\n    return fib(n-1) + fib(n-2)\n\nprint(slow())\nprint(fib(35))",
    hint:"Decorators return functions. Use functools.wraps to preserve metadata.", examples:"" },

  { id:"b08", group:"Python Basics", type:"coding", name:"CSV Parser", diff:"easy", xp:20,
    problem:"CSV Parser Without csv Module",
    desc:"1. write_csv(filename, headers, rows)\n2. read_csv(filename) -> list of dicts\n3. filter_csv(filename, key, value) -> matching rows\n\nTest with student data: name, age, score.",
    starter:"def write_csv(filename, headers, rows): pass\ndef read_csv(filename): pass\ndef filter_csv(filename, key, value): pass\n\nwrite_csv('students.csv', ['name','age','score'], [['Alice',22,95],['Bob',21,87]])\nprint(read_csv('students.csv'))\nprint(filter_csv('students.csv', 'score', '95'))",
    solution:"def write_csv(filename, headers, rows):\n    with open(filename, 'w') as f:\n        f.write(','.join(headers) + '\\n')\n        for row in rows: f.write(','.join(str(v) for v in row) + '\\n')\n\ndef read_csv(filename):\n    with open(filename) as f: lines = f.read().strip().split('\\n')\n    headers = lines[0].split(',')\n    return [dict(zip(headers, line.split(','))) for line in lines[1:]]\n\ndef filter_csv(filename, key, value):\n    return [row for row in read_csv(filename) if row.get(key) == str(value)]\n\nwrite_csv('students.csv', ['name','age','score'], [['Alice',22,95],['Bob',21,87],['Charlie',23,95]])\nprint(read_csv('students.csv'))\nprint(filter_csv('students.csv', 'score', '95'))",
    hint:"Split each line by comma. Use zip(headers, values) to create dicts.", examples:"" },

  { id:"b09", group:"Python Basics", type:"coding", name:"Comprehensions", diff:"easy", xp:15,
    problem:"One-Liner Data Transformations",
    desc:"Solve each in ONE line:\n1. Transpose a 3x3 matrix\n2. Dict from two lists\n3. All (i,j) pairs where i+j is even, i,j in 1..5\n4. Flatten a 2D list\n5. Group words by length",
    starter:"matrix = [[1,2,3],[4,5,6],[7,8,9]]\nkeys = ['a','b','c']; vals = [1,2,3]\nsentence = 'the quick brown fox jumps'\n\n# 1. Transpose\n# 2. Dict\n# 3. Even-sum pairs\n# 4. Flatten\n# 5. Group by length",
    solution:"matrix = [[1,2,3],[4,5,6],[7,8,9]]\nkeys = ['a','b','c']; vals = [1,2,3]\nsentence = 'the quick brown fox jumps'\n\nprint([[row[i] for row in matrix] for i in range(3)])\nprint({k: v for k, v in zip(keys, vals)})\nprint([(i,j) for i in range(1,6) for j in range(1,6) if (i+j)%2==0])\nprint([x for row in matrix for x in row])\nwords = sentence.split()\nprint({l: [w for w in words if len(w)==l] for l in set(len(w) for w in words)})",
    hint:"Nested comprehension: outer loop first, then inner. Dict comp: {k:v for ...}", examples:"" },

  { id:"b10", group:"Python Basics", type:"coding", name:"OOP Bank Account", diff:"medium", xp:35,
    problem:"Bank Account Class",
    desc:"BankAccount with:\n- deposit(amount), withdraw(amount)\n- InsufficientFundsError on overdraft\n- transfer(amount, other_account)\n- @classmethod from_dict(data)\n- __repr__ showing owner and balance",
    starter:"class InsufficientFundsError(Exception): pass\n\nclass BankAccount:\n    def __init__(self, owner, balance=0): pass\n    def deposit(self, amount): pass\n    def withdraw(self, amount): pass\n    def transfer(self, amount, other): pass\n    @classmethod\n    def from_dict(cls, data): pass\n    def __repr__(self): pass\n\nacc1 = BankAccount('Martial', 5000)\nacc2 = BankAccount.from_dict({'owner':'Alice','balance':2000})\nacc1.transfer(1000, acc2)\nprint(acc1); print(acc2)",
    solution:"class InsufficientFundsError(Exception): pass\n\nclass BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner; self.balance = balance\n    def deposit(self, amount):\n        if amount <= 0: raise ValueError('Amount must be positive')\n        self.balance += amount\n    def withdraw(self, amount):\n        if amount > self.balance: raise InsufficientFundsError(f'Need {amount}, have {self.balance}')\n        self.balance -= amount\n    def transfer(self, amount, other):\n        self.withdraw(amount); other.deposit(amount)\n    @classmethod\n    def from_dict(cls, data): return cls(data['owner'], data.get('balance', 0))\n    def __repr__(self): return f'BankAccount(owner={self.owner!r}, balance=Rs.{self.balance})'\n\nacc1 = BankAccount('Martial', 5000)\nacc2 = BankAccount.from_dict({'owner':'Alice','balance':2000})\nacc1.transfer(1000, acc2)\nprint(acc1); print(acc2)",
    hint:"@classmethod takes cls as first arg. Custom exceptions inherit from Exception.", examples:"" },

  /* ── DATA STRUCTURES (coding) ── */
  { id:"d01", group:"Data Structures", type:"coding", name:"Two Sum (All Approaches)", diff:"easy", xp:15,
    problem:"Two Sum — Brute, Hash, Two-Pointer",
    desc:"Find indices of two numbers that sum to target.\n1. O(n^2) brute force\n2. O(n) hash map\n3. O(n log n) two pointer\n4. Return ALL unique pairs",
    starter:"def two_sum_hash(nums, target): pass\ndef all_pairs(nums, target): pass\nprint(two_sum_hash([2,7,11,15], 9))\nprint(all_pairs([1,2,3,4,5,6,7,8], 9))",
    solution:"def two_sum_hash(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        if target-n in seen: return [seen[target-n], i]\n        seen[n] = i\n    return []\n\ndef all_pairs(nums, target):\n    seen = set(); pairs = set()\n    for n in nums:\n        if target-n in seen: pairs.add(tuple(sorted([n, target-n])))\n        seen.add(n)\n    return list(pairs)\n\nprint(two_sum_hash([2,7,11,15], 9))\nprint(all_pairs([1,2,3,4,5,6,7,8], 9))",
    hint:"Hash map: store each number, check if complement exists. O(n) time.", examples:"[2,7,11,15] target=9 -> [0,1]" },

  { id:"d02", group:"Data Structures", type:"coding", name:"Sliding Window", diff:"medium", xp:30,
    problem:"Sliding Window — 3 Variants",
    desc:"1. Max sum subarray of size k\n2. Longest substring without repeating chars\n3. Minimum window substring containing all chars of pattern t",
    starter:"def max_sum(arr, k): pass\ndef longest_unique(s): pass\ndef min_window(s, t): pass\nprint(max_sum([2,1,5,1,3,2], 3))\nprint(longest_unique('abcabcbb'))\nprint(min_window('ADOBECODEBANC', 'ABC'))",
    solution:"def max_sum(arr, k):\n    w = sum(arr[:k]); best = w\n    for i in range(k, len(arr)): w += arr[i]-arr[i-k]; best = max(best, w)\n    return best\n\ndef longest_unique(s):\n    seen = {}; l = best = 0\n    for r, c in enumerate(s):\n        if c in seen and seen[c] >= l: l = seen[c]+1\n        seen[c] = r; best = max(best, r-l+1)\n    return best\n\ndef min_window(s, t):\n    from collections import Counter\n    need = Counter(t); missing = len(t); l = best_l = best_r = 0; best = float('inf')\n    for r, c in enumerate(s, 1):\n        if need[c] > 0: missing -= 1\n        need[c] -= 1\n        if missing == 0:\n            while need[s[l]] < 0: need[s[l]] += 1; l += 1\n            if r-l < best: best=r-l; best_l,best_r = l,r\n            need[s[l]] += 1; missing += 1; l += 1\n    return s[best_l:best_r] if best < float('inf') else ''\n\nprint(max_sum([2,1,5,1,3,2], 3))\nprint(longest_unique('abcabcbb'))\nprint(min_window('ADOBECODEBANC','ABC'))",
    hint:"Expand right pointer, shrink left when condition met.", examples:"" },

  { id:"d03", group:"Data Structures", type:"coding", name:"Stack Applications", diff:"medium", xp:25,
    problem:"Classic Stack Problems",
    desc:"1. Valid Parentheses: '({[]})' -> True\n2. Evaluate Postfix: '3 4 + 2 *'\n3. Daily Temperatures: days to wait for warmer temp\n4. Queue using two stacks",
    starter:"def is_valid(s): pass\ndef eval_postfix(expr): pass\ndef daily_temps(temps): pass\nprint(is_valid('({[]})'))\nprint(eval_postfix('3 4 + 2 *'))\nprint(daily_temps([73,74,75,71,69,72,76,73]))",
    solution:"def is_valid(s):\n    stack = []; pairs = {'(':')','[':']','{':'}'}\n    for c in s:\n        if c in pairs: stack.append(c)\n        elif not stack or pairs[stack.pop()] != c: return False\n    return not stack\n\ndef eval_postfix(expr):\n    stack = []\n    for tok in expr.split():\n        if tok.lstrip('-').isdigit(): stack.append(int(tok))\n        else: b,a = stack.pop(),stack.pop(); stack.append(int(eval(f'{a}{tok}{b}')))\n    return stack[0]\n\ndef daily_temps(temps):\n    res = [0]*len(temps); stack = []\n    for i,t in enumerate(temps):\n        while stack and temps[stack[-1]] < t: j=stack.pop(); res[j]=i-j\n        stack.append(i)\n    return res\n\nprint(is_valid('({[]})'))\nprint(eval_postfix('3 4 + 2 *'))\nprint(daily_temps([73,74,75,71,69,72,76,73]))",
    hint:"Stack is LIFO. For daily temps, maintain indices with decreasing temperatures.", examples:"" },

  { id:"d04", group:"Data Structures", type:"coding", name:"Dynamic Programming", diff:"hard", xp:45,
    problem:"Classic DP Problems",
    desc:"1. Longest Common Subsequence\n2. 0/1 Knapsack\n3. Coin Change (min coins)\n4. Longest Increasing Subsequence\n5. Edit Distance",
    starter:"def lcs(s1, s2): pass\ndef knapsack(weights, values, cap): pass\ndef coin_change(coins, amount): pass\ndef lis(nums): pass\ndef edit_distance(s1, s2): pass\nprint(lcs('ABCBDAB','BDCABA'))\nprint(knapsack([2,3,4,5],[3,4,5,6],5))\nprint(coin_change([1,5,10,25],36))\nprint(lis([10,9,2,5,3,7,101,18]))\nprint(edit_distance('kitten','sitting'))",
    solution:"def lcs(s1,s2):\n    m,n=len(s1),len(s2);dp=[[0]*(n+1) for _ in range(m+1)]\n    for i in range(1,m+1):\n        for j in range(1,n+1):\n            if s1[i-1]==s2[j-1]: dp[i][j]=dp[i-1][j-1]+1\n            else: dp[i][j]=max(dp[i-1][j],dp[i][j-1])\n    return dp[m][n]\n\ndef knapsack(w,v,cap):\n    dp=[0]*(cap+1)\n    for i in range(len(w)):\n        for j in range(cap,w[i]-1,-1): dp[j]=max(dp[j],dp[j-w[i]]+v[i])\n    return dp[cap]\n\ndef coin_change(coins,amount):\n    dp=[float('inf')]*(amount+1);dp[0]=0\n    for c in coins:\n        for a in range(c,amount+1): dp[a]=min(dp[a],dp[a-c]+1)\n    return dp[amount] if dp[amount]!=float('inf') else -1\n\ndef lis(nums):\n    dp=[1]*len(nums)\n    for i in range(1,len(nums)):\n        for j in range(i):\n            if nums[j]<nums[i]: dp[i]=max(dp[i],dp[j]+1)\n    return max(dp)\n\ndef edit_distance(s1,s2):\n    m,n=len(s1),len(s2);dp=[[0]*(n+1) for _ in range(m+1)]\n    for i in range(m+1): dp[i][0]=i\n    for j in range(n+1): dp[0][j]=j\n    for i in range(1,m+1):\n        for j in range(1,n+1):\n            if s1[i-1]==s2[j-1]: dp[i][j]=dp[i-1][j-1]\n            else: dp[i][j]=1+min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1])\n    return dp[m][n]\n\nprint(lcs('ABCBDAB','BDCABA'))\nprint(knapsack([2,3,4,5],[3,4,5,6],5))\nprint(coin_change([1,5,10,25],36))\nprint(lis([10,9,2,5,3,7,101,18]))\nprint(edit_distance('kitten','sitting'))",
    hint:"DP: define subproblems, write recurrence, fill table bottom-up.", examples:"" },

  { id:"d05", group:"Data Structures", type:"coding", name:"Binary Search", diff:"medium", xp:30,
    problem:"Binary Search Variants",
    desc:"1. Classic binary search\n2. First and last position of element\n3. Search in rotated sorted array\n4. Minimum in rotated array\n5. Koko eating bananas",
    starter:"def binary_search(arr, target): pass\ndef first_last(arr, target): pass\ndef search_rotated(arr, target): pass\nprint(binary_search([1,3,5,7,9], 7))\nprint(first_last([5,7,7,8,8,10], 8))\nprint(search_rotated([4,5,6,7,0,1,2], 0))",
    solution:"def binary_search(arr,t):\n    l,r=0,len(arr)-1\n    while l<=r:\n        m=(l+r)//2\n        if arr[m]==t: return m\n        elif arr[m]<t: l=m+1\n        else: r=m-1\n    return -1\n\ndef first_last(arr,t):\n    def find(left):\n        l,r,res=0,len(arr)-1,-1\n        while l<=r:\n            m=(l+r)//2\n            if arr[m]==t:\n                res=m\n                if left: r=m-1\n                else: l=m+1\n            elif arr[m]<t: l=m+1\n            else: r=m-1\n        return res\n    return [find(True),find(False)]\n\ndef search_rotated(arr,t):\n    l,r=0,len(arr)-1\n    while l<=r:\n        m=(l+r)//2\n        if arr[m]==t: return m\n        if arr[l]<=arr[m]:\n            if arr[l]<=t<arr[m]: r=m-1\n            else: l=m+1\n        else:\n            if arr[m]<t<=arr[r]: l=m+1\n            else: r=m-1\n    return -1\n\nprint(binary_search([1,3,5,7,9],7))\nprint(first_last([5,7,7,8,8,10],8))\nprint(search_rotated([4,5,6,7,0,1,2],0))",
    hint:"Rotated: determine which half is sorted, check if target is in that half.", examples:"" },

  /* ── ML ALGORITHMS (coding) ── */
  { id:"n01", group:"ML Algorithms", type:"coding", name:"Linear Regression Scratch", diff:"hard", xp:60,
    problem:"Linear Regression with Gradient Descent",
    desc:"Implement gradient descent on y = 3x + 2 + noise:\n1. Generate 200 data points (seed=42)\n2. Gradient descent lr=0.05, epochs=2000\n3. Print loss every 400 epochs\n4. Compute R^2 score\n5. Compare with closed-form solution",
    starter:"import numpy as np\nnp.random.seed(42)\nX = np.random.uniform(-3, 3, 200)\ny = 3*X + 2 + np.random.randn(200)*0.8\n\nm, b = 0.0, 0.0\nlr = 0.05\nfor epoch in range(2000):\n    pass\n\nprint(f'm={m:.3f} (true 3.0), b={b:.3f} (true 2.0)')",
    solution:"import numpy as np\nnp.random.seed(42)\nX = np.random.uniform(-3,3,200)\ny = 3*X + 2 + np.random.randn(200)*0.8\n\nm,b=0.0,0.0;lr=0.05\nfor ep in range(2000):\n    pred=m*X+b; loss=np.mean((pred-y)**2)\n    m-=lr*np.mean((pred-y)*X); b-=lr*np.mean(pred-y)\n    if ep%400==0: print(f'Ep {ep}: loss={loss:.5f} m={m:.3f} b={b:.3f}')\n\ny_pred=m*X+b\nss_res=np.sum((y-y_pred)**2); ss_tot=np.sum((y-y.mean())**2)\nprint(f'R2={1-ss_res/ss_tot:.5f}')\nprint(f'Result: m={m:.4f}, b={b:.4f}')",
    hint:"MSE gradient: dm = mean((pred-y)*X), db = mean(pred-y). R2 = 1 - SS_res/SS_tot.", examples:"" },

  { id:"n02", group:"ML Algorithms", type:"coding", name:"K-Means Scratch", diff:"hard", xp:60,
    problem:"K-Means++ Clustering",
    desc:"Implement K-Means with K-Means++ init:\n1. Smart centroid init (prob proportional to distance)\n2. Assign and update steps\n3. Convergence check\n4. Compute inertia\n5. Elbow method for k=1..6",
    starter:"import numpy as np\nnp.random.seed(42)\nX = np.vstack([\n    np.random.randn(60,2)+[0,0],\n    np.random.randn(60,2)+[5,5],\n    np.random.randn(60,2)+[0,5]\n])\n\ndef kmeans(X, k=3, max_iter=100): pass\n\nlabels, centroids, inertia, iters = kmeans(X)\nprint(f'Converged in {iters} iters, inertia={inertia:.2f}')",
    solution:"import numpy as np\nnp.random.seed(42)\nX = np.vstack([np.random.randn(60,2)+[0,0],np.random.randn(60,2)+[5,5],np.random.randn(60,2)+[0,5]])\n\ndef kmeans(X,k=3,max_iter=100,tol=1e-6):\n    idx=np.random.choice(len(X));centroids=[X[idx]]\n    for _ in range(k-1):\n        dists=np.array([min(np.linalg.norm(x-c)**2 for c in centroids) for x in X])\n        centroids.append(X[np.random.choice(len(X),p=dists/dists.sum())])\n    centroids=np.array(centroids)\n    for i in range(max_iter):\n        dists=np.array([[np.linalg.norm(x-c)**2 for c in centroids] for x in X])\n        labels=np.argmin(dists,axis=1)\n        new_c=np.array([X[labels==j].mean(axis=0) for j in range(k)])\n        if np.allclose(centroids,new_c,atol=tol): break\n        centroids=new_c\n    inertia=sum(np.sum((X[labels==j]-centroids[j])**2) for j in range(k))\n    return labels,centroids,inertia,i+1\n\nlabels,centroids,inertia,iters=kmeans(X)\nprint(f'Converged in {iters} iters, inertia={inertia:.2f}')\nfor j in range(3): print(f'Cluster {j}: {(labels==j).sum()} pts')",
    hint:"K-Means++ init: weight by squared distance to nearest centroid.", examples:"" },

  { id:"n03", group:"ML Algorithms", type:"coding", name:"Neural Network", diff:"hard", xp:80,
    problem:"2-Layer Neural Net from Scratch",
    desc:"Build: Linear -> ReLU -> Linear -> Sigmoid\n1. Forward pass\n2. Backpropagation\n3. Train on XOR (needs hidden layer)\n4. Print loss every 2000 epochs",
    starter:"import numpy as np\nnp.random.seed(42)\nX = np.array([[0,0],[0,1],[1,0],[1,1]], dtype=float)\ny = np.array([[0],[1],[1],[0]], dtype=float)\n\ndef sigmoid(z): pass\ndef relu(z): pass\n\nclass NeuralNet:\n    def __init__(self, lr=0.5): pass\n    def forward(self, X): pass\n    def backward(self, X, y): pass\n    def train(self, X, y, epochs=10000): pass\n\nnn = NeuralNet()\nnn.train(X, y)",
    solution:"import numpy as np\nnp.random.seed(42)\nX = np.array([[0,0],[0,1],[1,0],[1,1]],dtype=float)\ny = np.array([[0],[1],[1],[0]],dtype=float)\n\ndef sigmoid(z): return 1/(1+np.exp(-np.clip(z,-500,500)))\ndef relu(z): return np.maximum(0,z)\ndef relu_g(z): return (z>0).astype(float)\n\nclass NeuralNet:\n    def __init__(self,lr=0.5):\n        self.W1=np.random.randn(2,4)*0.5; self.b1=np.zeros((1,4))\n        self.W2=np.random.randn(4,1)*0.5; self.b2=np.zeros((1,1))\n        self.lr=lr\n    def forward(self,X):\n        self.z1=X@self.W1+self.b1; self.a1=relu(self.z1)\n        self.z2=self.a1@self.W2+self.b2; self.a2=sigmoid(self.z2)\n        return self.a2\n    def backward(self,X,y):\n        n=len(X)\n        d2=(self.a2-y)*self.a2*(1-self.a2)\n        dW2=self.a1.T@d2/n; db2=d2.mean(0,keepdims=True)\n        d1=(d2@self.W2.T)*relu_g(self.z1)\n        dW1=X.T@d1/n; db1=d1.mean(0,keepdims=True)\n        self.W2-=self.lr*dW2; self.b2-=self.lr*db2\n        self.W1-=self.lr*dW1; self.b1-=self.lr*db1\n    def train(self,X,y,epochs=10000):\n        for ep in range(epochs):\n            out=self.forward(X)\n            loss=-np.mean(y*np.log(out+1e-9)+(1-y)*np.log(1-out+1e-9))\n            self.backward(X,y)\n            if ep%2000==0: print(f'Ep {ep}: loss={loss:.6f}')\n        print('Predictions:',[int(p[0]>=0.5) for p in self.forward(X)])\n\nNeuralNet().train(X,y)",
    hint:"ReLU gradient=1 if z>0. Backprop: compute output gradient, multiply by activation derivative.", examples:"" },

  { id:"n04", group:"ML Algorithms", type:"coding", name:"Cosine Similarity RAG", diff:"medium", xp:45,
    problem:"Cosine Similarity for RAG Systems",
    desc:"1. cosine_sim(a, b) without sklearn\n2. top_k_similar(query_vec, corpus_vecs, k=3)\n3. Build a tiny TF-IDF vectorizer\n4. Find top-2 similar docs for a query",
    starter:"import numpy as np\nnp.random.seed(42)\n\ndef cosine_sim(a, b): pass\ndef top_k_similar(query, corpus, k=3): pass\n\ncorpus = np.random.randn(5, 8)\nquery = np.random.randn(8)\nresults = top_k_similar(query, corpus, k=3)\nfor idx, score in results: print(f'Doc[{idx}]: {score:.4f}')",
    solution:"import numpy as np, math\nnp.random.seed(42)\n\ndef cosine_sim(a,b):\n    return np.dot(a,b)/(np.linalg.norm(a)*np.linalg.norm(b)+1e-9)\n\ndef top_k_similar(query,corpus,k=3):\n    sims=[(i,cosine_sim(query,doc)) for i,doc in enumerate(corpus)]\n    return sorted(sims,key=lambda x:x[1],reverse=True)[:k]\n\ncorpus=np.random.randn(5,8)\nquery=np.random.randn(8)\nfor idx,score in top_k_similar(query,corpus,k=3):\n    print(f'Doc[{idx}]: {score:.4f}')",
    hint:"cosine_sim = dot(a,b) / (||a|| * ||b||). Add 1e-9 to avoid division by zero.", examples:"" },

  /* ── INTERVIEW QUESTIONS: TOP COMPANIES ── */
  { id:"iv01", group:"Google", type:"interview", name:"LRU Cache", diff:"hard", xp:60,
    problem:"LRU Cache — Google L4/L5",
    desc:"Design LRU cache with O(1) get() and put().\n\nLRUCache(capacity)\n- get(key) -> value or -1\n- put(key, value) -> evicts least recently used if full\n\nAsked at Google, Meta, Amazon L4-L5.",
    examples:"LRUCache(2)\nput(1,1), put(2,2)\nget(1) -> 1\nput(3,3) -> evicts key 2\nget(2) -> -1",
    starter:"class LRUCache:\n    def __init__(self, capacity): pass\n    def get(self, key): pass\n    def put(self, key, value): pass\n\nc = LRUCache(2)\nc.put(1,1); c.put(2,2)\nprint(c.get(1))\nc.put(3,3)\nprint(c.get(2))",
    solution:"from collections import OrderedDict\n\nclass LRUCache:\n    def __init__(self,cap): self.cap=cap; self.cache=OrderedDict()\n    def get(self,key):\n        if key not in self.cache: return -1\n        self.cache.move_to_end(key); return self.cache[key]\n    def put(self,key,val):\n        if key in self.cache: self.cache.move_to_end(key)\n        self.cache[key]=val\n        if len(self.cache)>self.cap: self.cache.popitem(last=False)\n\nc=LRUCache(2)\nc.put(1,1);c.put(2,2)\nprint(c.get(1))\nc.put(3,3)\nprint(c.get(2))\nc.put(4,4)\nprint(c.get(1)); print(c.get(3)); print(c.get(4))",
    hint:"OrderedDict preserves order. move_to_end() marks as recently used. popitem(last=False) removes LRU." },

  { id:"iv02", group:"Google", type:"interview", name:"Trapping Rain Water", diff:"hard", xp:55,
    problem:"Trapping Rain Water — Google L4",
    desc:"Given height array, compute total water trapped.\n\n3 approaches:\n1. Brute O(n^2)\n2. DP precompute O(n)\n3. Two pointers O(n) O(1) space",
    examples:"[0,1,0,2,1,0,1,3,2,1,2,1] -> 6",
    starter:"def trap(height): pass  # optimal O(n) O(1)\nprint(trap([0,1,0,2,1,0,1,3,2,1,2,1]))\nprint(trap([4,2,0,3,2,5]))",
    solution:"def trap(h):\n    l,r=0,len(h)-1; lmax=rmax=total=0\n    while l<r:\n        if h[l]<h[r]:\n            if h[l]>=lmax: lmax=h[l]\n            else: total+=lmax-h[l]\n            l+=1\n        else:\n            if h[r]>=rmax: rmax=h[r]\n            else: total+=rmax-h[r]\n            r-=1\n    return total\n\nprint(trap([0,1,0,2,1,0,1,3,2,1,2,1]))\nprint(trap([4,2,0,3,2,5]))",
    hint:"Two pointer: water = min(max_left, max_right) - height. Move pointer with smaller max." },

  { id:"iv03", group:"Amazon", type:"interview", name:"Meeting Rooms II", diff:"medium", xp:40,
    problem:"Meeting Rooms II — Amazon SDE-2",
    desc:"Given intervals [start,end], find minimum conference rooms needed.\n\nAlso: can one person attend all meetings?",
    examples:"[[0,30],[5,10],[15,20]] -> 2 rooms",
    starter:"import heapq\ndef min_rooms(intervals): pass\ndef can_attend_all(intervals): pass\nprint(min_rooms([[0,30],[5,10],[15,20]]))\nprint(can_attend_all([[7,10],[2,4]]))",
    solution:"import heapq\n\ndef min_rooms(intervals):\n    if not intervals: return 0\n    intervals.sort(key=lambda x:x[0]); heap=[]\n    for s,e in intervals:\n        if heap and heap[0]<=s: heapq.heappop(heap)\n        heapq.heappush(heap,e)\n    return len(heap)\n\ndef can_attend_all(intervals):\n    intervals=sorted(intervals,key=lambda x:x[0])\n    for i in range(1,len(intervals)):\n        if intervals[i][0]<intervals[i-1][1]: return False\n    return True\n\nprint(min_rooms([[0,30],[5,10],[15,20]]))\nprint(min_rooms([[7,10],[2,4]]))\nprint(can_attend_all([[0,30],[5,10],[15,20]]))\nprint(can_attend_all([[7,10],[2,4]]))",
    hint:"Min-heap stores end times. If heap top <= start time, reuse that room." },

  { id:"iv04", group:"Amazon", type:"interview", name:"Product Except Self", diff:"medium", xp:35,
    problem:"Product of Array Except Self — Amazon SDE",
    desc:"Return array where output[i] = product of all elements except nums[i].\nSolve WITHOUT division in O(n).",
    examples:"[1,2,3,4] -> [24,12,8,6]",
    starter:"def product_except_self(nums): pass\nprint(product_except_self([1,2,3,4]))\nprint(product_except_self([-1,1,0,-3,3]))",
    solution:"def product_except_self(nums):\n    n=len(nums); result=[1]*n\n    left=1\n    for i in range(n): result[i]=left; left*=nums[i]\n    right=1\n    for i in range(n-1,-1,-1): result[i]*=right; right*=nums[i]\n    return result\n\nprint(product_except_self([1,2,3,4]))\nprint(product_except_self([-1,1,0,-3,3]))",
    hint:"First pass: left products. Second pass: multiply by right products." },

  { id:"iv05", group:"Microsoft", type:"interview", name:"Max Subarray (Kadane)", diff:"medium", xp:35,
    problem:"Maximum Subarray — Microsoft SDE",
    desc:"1. Max sum subarray (Kadane's)\n2. Return actual subarray\n3. Max product subarray\n4. Circular array max sum",
    examples:"[-2,1,-3,4,-1,2,1,-5,4] -> 6",
    starter:"def max_sum(nums): pass\ndef max_subarray(nums): pass\ndef max_product(nums): pass\nnums=[-2,1,-3,4,-1,2,1,-5,4]\nprint(max_sum(nums))\nprint(max_subarray(nums))\nprint(max_product([2,3,-2,4]))",
    solution:"def max_sum(nums):\n    cur=best=nums[0]\n    for n in nums[1:]: cur=max(n,cur+n); best=max(best,cur)\n    return best\n\ndef max_subarray(nums):\n    cur=best=nums[0]; start=end=s=0\n    for i in range(1,len(nums)):\n        if nums[i]>cur+nums[i]: cur=nums[i]; s=i\n        else: cur+=nums[i]\n        if cur>best: best=cur; start=s; end=i\n    return nums[start:end+1]\n\ndef max_product(nums):\n    mn=mx=best=nums[0]\n    for n in nums[1:]:\n        mx,mn=max(n,mx*n,mn*n),min(n,mx*n,mn*n)\n        best=max(best,mx)\n    return best\n\nnums=[-2,1,-3,4,-1,2,1,-5,4]\nprint(max_sum(nums))\nprint(max_subarray(nums))\nprint(max_product([2,3,-2,4]))",
    hint:"Kadane: extend or restart. For product: track both max and min (negatives flip sign)." },

  { id:"iv06", group:"Meta/Facebook", type:"interview", name:"Valid Parentheses", diff:"easy", xp:25,
    problem:"Valid Parentheses + Generate All — Meta E3",
    desc:"Part 1: Is string of brackets valid?\nPart 2: Minimum removals to make valid.\nPart 3: Generate all valid combinations of n pairs.",
    examples:"'()[]{}' -> True\n'([)]' -> False\nGenerate(3): ['((()))','(()())','(())()','()(())','()()()']",
    starter:"def is_valid(s): pass\ndef min_removals(s): pass\ndef generate_parens(n): pass\nprint(is_valid('()[]{}'))\nprint(min_removals('()())()')))\nprint(generate_parens(3))",
    solution:"def is_valid(s):\n    stack=[]; pairs={'(':')','[':']','{':'}'}\n    for c in s:\n        if c in pairs: stack.append(c)\n        elif not stack or pairs[stack.pop()]!=c: return False\n    return not stack\n\ndef min_removals(s):\n    op=cl=0\n    for c in s:\n        if c=='(': op+=1\n        elif c==')':\n            if op: op-=1\n            else: cl+=1\n    return op+cl\n\ndef generate_parens(n):\n    result=[]\n    def bt(s,o,c):\n        if len(s)==2*n: result.append(s); return\n        if o<n: bt(s+'(',o+1,c)\n        if c<o: bt(s+')',o,c+1)\n    bt('',0,0); return result\n\nprint(is_valid('()[]{}'))\nprint(min_removals('()())()'))\nprint(generate_parens(3))",
    hint:"Backtracking: add '(' if open<n, add ')' if close<open." },

  { id:"iv07", group:"Flipkart/Meesho", type:"interview", name:"Top K Products", diff:"medium", xp:40,
    problem:"Top K Frequent Items — Flipkart SDE-2",
    desc:"Given product purchases, find top K most purchased.\n\nSolve with:\n1. Sort approach\n2. Min-heap of size k\n3. Bucket sort O(n)",
    examples:"['phone','laptop','phone','tablet','phone','laptop'], k=2 -> ['phone','laptop']",
    starter:"from collections import Counter\nimport heapq\n\ndef top_k_sort(items, k): pass\ndef top_k_heap(items, k): pass\ndef top_k_bucket(items, k): pass\n\nitems=['phone','laptop','phone','tablet','phone','laptop','tablet','phone']\nprint(top_k_sort(items, 2))\nprint(top_k_heap(items, 2))",
    solution:"from collections import Counter\nimport heapq\n\ndef top_k_sort(items,k): return [p for p,_ in Counter(items).most_common(k)]\n\ndef top_k_heap(items,k):\n    freq=Counter(items)\n    return [p for p,_ in heapq.nlargest(k,freq.items(),key=lambda x:x[1])]\n\ndef top_k_bucket(items,k):\n    freq=Counter(items)\n    buckets=[[] for _ in range(len(items)+1)]\n    for p,c in freq.items(): buckets[c].append(p)\n    result=[]\n    for i in range(len(buckets)-1,-1,-1):\n        result.extend(buckets[i])\n        if len(result)>=k: break\n    return result[:k]\n\nitems=['phone','laptop','phone','tablet','phone','laptop','tablet','phone']\nfor fn in [top_k_sort,top_k_heap,top_k_bucket]: print(f'{fn.__name__}: {fn(items,2)}')",
    hint:"Bucket sort: index by frequency, iterate from highest. O(n) time." },

  { id:"iv08", group:"Infosys/TCS/Wipro", type:"interview", name:"String Problems", diff:"easy", xp:20,
    problem:"String Manipulation — TCS NQT Pattern",
    desc:"5 common TCS NQT string problems:\n1. Check anagram\n2. Count words\n3. Reverse words\n4. Check pangram\n5. Longest word",
    examples:"'listen' and 'silent' -> anagram\n'The quick brown fox...' -> pangram",
    starter:"def is_anagram(s1, s2): pass\ndef reverse_words(s): pass\ndef is_pangram(s): pass\ndef longest_word(s): pass\nprint(is_anagram('listen','silent'))\nprint(reverse_words('Hello World Python'))\nprint(is_pangram('The quick brown fox jumps over the lazy dog'))\nprint(longest_word('The quick brown fox jumps'))",
    solution:"import string\n\ndef is_anagram(s1,s2): return sorted(s1.lower())==sorted(s2.lower())\ndef reverse_words(s): return ' '.join(s.split()[::-1])\ndef is_pangram(s): return set(string.ascii_lowercase).issubset(set(s.lower()))\ndef longest_word(s): return max(s.split(),key=len) if s.split() else ''\n\nprint(is_anagram('listen','silent'))\nprint(reverse_words('Hello World Python'))\nprint(is_pangram('The quick brown fox jumps over the lazy dog'))\nprint(longest_word('The quick brown fox jumps'))",
    hint:"Anagram: sort chars. Pangram: check all 26 letters present with set operations." },

  { id:"iv09", group:"ML Interviews", type:"interview", name:"Softmax & Cross-Entropy", diff:"medium", xp:40,
    problem:"Softmax + Cross-Entropy — ML Engineer Interview",
    desc:"Asked at Sarvam AI, Juspay, Zepto ML:\n1. Numerically stable softmax\n2. Cross-entropy loss\n3. Explain why subtract max before exp\n4. Combined gradient: y_pred - y_true",
    examples:"softmax([1,2,3]) -> [0.09,0.245,0.665]\nsoftmax([1000,1001,1002]) -> same result (stability)",
    starter:"import numpy as np\n\ndef softmax(z): pass  # numerically stable\ndef cross_entropy(y_true, y_pred): pass\n\nprint(softmax([1.0, 2.0, 3.0]))\nprint(softmax([1000.0, 1001.0, 1002.0]))  # must not be nan",
    solution:"import numpy as np\n\ndef softmax(z):\n    z=np.array(z,dtype=float)\n    z_stable=z-z.max()\n    e=np.exp(z_stable)\n    return e/e.sum()\n\ndef cross_entropy(y_true,y_pred):\n    y_pred=np.clip(y_pred,1e-9,1-1e-9)\n    return -np.sum(y_true*np.log(y_pred))\n\nprint('softmax:',softmax([1.0,2.0,3.0]).round(4))\nprint('stable: ',softmax([1000.0,1001.0,1002.0]).round(4))\ny_true=np.array([0,0,1])\ny_pred=softmax([2.0,1.0,3.0])\nprint('CE loss:',cross_entropy(y_true,y_pred).round(4))\nprint('Gradient (y_pred-y_true):',(y_pred-y_true).round(4))",
    hint:"Subtract max(z) before exp to avoid overflow. CE+Softmax gradient simplifies to y_pred - y_true." },

  { id:"iv10", group:"ML Interviews", type:"interview", name:"PCA from Scratch", diff:"hard", xp:60,
    problem:"PCA from Scratch — Senior ML Interview",
    desc:"Implement PCA using NumPy only:\n1. Center data\n2. Covariance matrix\n3. Eigendecomposition\n4. Project onto top-k components\n5. Explained variance ratio\n6. Verify against sklearn",
    examples:"PCA on Iris (4D) -> 2D, explained variance ~97%",
    starter:"import numpy as np\nfrom sklearn.datasets import load_iris\nfrom sklearn.preprocessing import StandardScaler\n\niris = load_iris()\nX = StandardScaler().fit_transform(iris.data)\n\ndef pca_scratch(X, k): pass\n\nX_pca, evr = pca_scratch(X, 2)\nprint(f'Shape: {X_pca.shape}')\nprint(f'Explained variance: {evr.round(4)}')",
    solution:"import numpy as np\nfrom sklearn.datasets import load_iris\nfrom sklearn.preprocessing import StandardScaler\n\niris=load_iris()\nX=StandardScaler().fit_transform(iris.data)\n\ndef pca_scratch(X,k):\n    Xc=X-X.mean(axis=0)\n    cov=Xc.T@Xc/(len(X)-1)\n    evals,evecs=np.linalg.eig(cov)\n    idx=np.argsort(evals)[::-1]\n    evals,evecs=evals[idx].real,evecs[:,idx].real\n    evr=evals[:k]/evals.sum()\n    return Xc@evecs[:,:k],evr\n\nX_pca,evr=pca_scratch(X,2)\nprint(f'Shape: {X_pca.shape}')\nprint(f'Explained variance: {evr.round(4)}')\nprint(f'Total: {evr.sum():.4f}')",
    hint:"np.linalg.eig returns (eigenvalues, eigenvectors). Sort descending. Project: X_centered @ top_k_eigenvecs." },

];

/* =================== PROJECTS =================== */
const PROJECTS = [
  { phase:"Month 1 // Week 3", title:"CLI Task Manager",
    desc:"Command-line todo app with file persistence, priority levels, due dates, and filters.",
    full_desc:"Build a full-featured CLI task manager:\n• CRUD operations (add/edit/delete/list)\n• Priority levels (high/medium/low)\n• Due dates with overdue detection\n• Category tagging and filtering\n• JSON persistence across sessions\n• Rich CLI output with colors\n• Search and filter commands",
    requirements:["Python 3.10+","argparse or click","rich (for colored output)","json (stdlib)","datetime (stdlib)"],
    setup:"pip install rich click",
    github_solution:"https://github.com/topics/python-todo-cli",
    tech:["Python","OOP","JSON","argparse","Rich CLI"], xp:200, unlockWeek:3, difficulty:"easy" },

  { phase:"Month 1 // Week 5", title:"EDA Dashboard",
    desc:"Analyse Zomato Bangalore dataset — full EDA with distributions, correlations, insights.",
    full_desc:"End-to-end exploratory data analysis:\n• Load and clean Zomato Bangalore dataset from Kaggle\n• Handle missing values, duplicates, wrong dtypes\n• Univariate: histograms, box plots\n• Bivariate: scatter, correlation heatmap\n• Top 10 restaurants, cuisines, locations\n• Price vs rating analysis\n• Export HTML report with Plotly",
    requirements:["pandas>=2.0","numpy","matplotlib","seaborn","plotly","jupyter notebook"],
    setup:"pip install pandas numpy matplotlib seaborn plotly jupyter\n# Dataset: https://www.kaggle.com/datasets/himanshupoddar/zomato-bangalore-restaurants",
    github_solution:"https://github.com/dsrscientist/dataset1",
    tech:["Pandas","NumPy","Matplotlib","Seaborn","Plotly"], xp:280, unlockWeek:5, difficulty:"easy" },

  { phase:"Month 2 // Week 7", title:"Bangalore House Price Predictor",
    desc:"End-to-end ML: EDA -> feature engineering -> model comparison -> Flask API.",
    full_desc:"Full ML pipeline:\n• Load Bengaluru House Price dataset from Kaggle\n• Feature engineering: price per sqft, BHK extraction\n• Handle outliers (IQR method)\n• One-hot encode location (top 40)\n• Compare: Linear Reg, Lasso, Decision Tree\n• GridSearchCV for tuning\n• Pickle best model\n• Flask REST API: POST /predict\n• Simple HTML frontend",
    requirements:["scikit-learn","pandas","numpy","flask","pickle","matplotlib"],
    setup:"pip install scikit-learn pandas numpy flask matplotlib\n# Dataset: https://www.kaggle.com/datasets/amitabhajoy/bengaluru-house-price-data",
    github_solution:"https://github.com/codebasics/py/tree/master/ML/BangloreHomePrices",
    tech:["Scikit-learn","Flask","Pandas","XGBoost","Pickle"], xp:400, unlockWeek:7, difficulty:"medium" },

  { phase:"Month 2 // Week 8", title:"Spam Email Classifier",
    desc:"NLP pipeline: TF-IDF vectorisation -> Naive Bayes/SVM -> 95%+ accuracy.",
    full_desc:"Production-grade spam classifier:\n• SMS Spam Collection dataset\n• Text preprocessing: lowercase, punctuation, stopwords\n• TF-IDF feature extraction\n• Models: NaiveBayes, SVM, Logistic Regression\n• Accuracy, precision, recall, F1, ROC-AUC\n• Confusion matrix visualisation\n• Streamlit web app for live predictions",
    requirements:["scikit-learn","nltk","pandas","streamlit","joblib","matplotlib"],
    setup:"pip install scikit-learn nltk pandas streamlit joblib\n# nltk.download('stopwords')\n# Dataset: https://www.kaggle.com/datasets/uciml/sms-spam-collection-dataset",
    github_solution:"https://github.com/campusx-official/spam-classifier",
    tech:["NLTK","TF-IDF","Scikit-learn","Naive Bayes","Streamlit"], xp:380, unlockWeek:8, difficulty:"medium" },

  { phase:"Month 2 // Week 9", title:"Customer Churn Predictor",
    desc:"Full ML pipeline with SHAP explainability, hyperparameter tuning, FastAPI deployment.",
    full_desc:"Enterprise-grade churn prediction:\n• Telecom churn dataset\n• Handle class imbalance: SMOTE\n• Feature engineering and binning\n• XGBoost + LightGBM comparison\n• SHAP values for explainability\n• FastAPI REST endpoint\n• Docker containerisation\n• MLflow experiment tracking",
    requirements:["xgboost","lightgbm","shap","imbalanced-learn","fastapi","uvicorn","mlflow"],
    setup:"pip install xgboost lightgbm shap imbalanced-learn fastapi uvicorn mlflow\n# Dataset: https://www.kaggle.com/datasets/blastchar/telco-customer-churn",
    github_solution:"https://github.com/campusx-official/customer-churn-prediction",
    tech:["XGBoost","SHAP","FastAPI","Docker","Scikit-learn"], xp:500, unlockWeek:9, difficulty:"hard" },

  { phase:"Month 3 // Week 10", title:"Real-time Object Detection",
    desc:"YOLOv8 on webcam feed with FastAPI backend — extending your drone project.",
    full_desc:"Production CV system:\n• YOLOv8 inference on webcam/video\n• Custom class training on your dataset\n• FastAPI WebSocket streaming\n• React frontend with live video\n• Object tracking with ByteTrack\n• FPS counter and latency display\n• REST API: /detect endpoint for images",
    requirements:["ultralytics","opencv-python","fastapi","uvicorn","websockets","torch"],
    setup:"pip install ultralytics opencv-python fastapi uvicorn websockets torch",
    github_solution:"https://github.com/ultralytics/ultralytics/tree/main/examples",
    tech:["YOLOv8","OpenCV","FastAPI","PyTorch","React"], xp:600, unlockWeek:10, difficulty:"hard" },

  { phase:"Month 3 // Week 11", title:"RAG Course Q&A Bot v2",
    desc:"Upgrade your existing RAG system: multi-doc, web UI, Ollama + bge-m3, Docker.",
    full_desc:"Production RAG system (extending your existing project):\n• Multi-document ingestion (PDF, YouTube, text)\n• bge-m3 embeddings via Ollama (already working!)\n• FAISS vector store with persistence\n• llama3.2 for generation\n• Source citations with page numbers\n• Conversation history\n• FastAPI + React chat UI\n• Docker Compose deployment",
    requirements:["langchain","faiss-cpu","ollama","fastapi","uvicorn","python-multipart"],
    setup:"pip install langchain faiss-cpu fastapi uvicorn python-multipart\n# You already have Ollama + bge-m3 + llama3.2 running!",
    github_solution:"https://github.com/langchain-ai/rag-from-scratch",
    tech:["LangChain","Ollama","FAISS","FastAPI","Docker","React"], xp:700, unlockWeek:11, difficulty:"hard" },

  { phase:"Month 3 // Week 12", title:"AI Portfolio Website",
    desc:"Deploy all projects with a live portfolio — GitHub stats, demos, live chatbot, Vercel.",
    full_desc:"Your job-ready showcase:\n• React + Tailwind portfolio\n• GitHub API: repos, commits, languages\n• Live demo embeds for each project\n• Live AI chatbot (your RAG bot)\n• Skills radar chart\n• Timeline of learning journey\n• Dark mode and responsive design\n• Deploy to Vercel (free tier)",
    requirements:["React","Tailwind CSS","GitHub API","Vercel CLI","vite"],
    setup:"npm create vite@latest portfolio -- --template react\ncd portfolio && npm install\nnpm install -D tailwindcss",
    github_solution:"https://github.com/topics/developer-portfolio",
    tech:["React","Tailwind","GitHub API","Vercel","FastAPI"], xp:500, unlockWeek:12, difficulty:"medium" },
];

/* =================== WEEKLY MINI PROJECTS =================== */
const MINI_PROJECTS = [
  { week:1, title:"Number Guessing Game", desc:"CLI game: computer picks 1-100, user guesses with higher/lower hints. Track attempts.", solution_url:"https://replit.com/@pythonprojects/number-guess", tags:["Python","loops","random"] },
  { week:2, title:"Contact Book CLI", desc:"Store/search/delete contacts using dicts. Save to JSON.", solution_url:"https://github.com/topics/python-contact-book", tags:["dict","JSON","file I/O"] },
  { week:3, title:"Student Grade Manager", desc:"OOP: Student class, GradeBook, compute stats, export CSV.", solution_url:"https://replit.com/@pythonprojects/grade-manager", tags:["OOP","CSV","classes"] },
  { week:4, title:"Matrix Calculator", desc:"NumPy: add, subtract, multiply, inverse, determinant with CLI.", solution_url:"https://replit.com/@pythonprojects/matrix-calc", tags:["NumPy","math","CLI"] },
  { week:5, title:"COVID-19 Data Analyser", desc:"Load WHO COVID dataset, plot country comparisons, rolling averages.", solution_url:"https://github.com/datasets/covid-19", tags:["Pandas","Matplotlib","EDA"] },
  { week:6, title:"Stock Price Visualiser", desc:"Fetch stock data with yfinance, plot candlestick + moving averages.", solution_url:"https://github.com/topics/yfinance-python", tags:["yfinance","Plotly","finance"] },
  { week:7, title:"Titanic Survival Predictor", desc:"Full ML: clean data, engineer features, train classifier, evaluate.", solution_url:"https://www.kaggle.com/code/alexisbcook/titanic-tutorial", tags:["sklearn","Pandas","classification"] },
  { week:8, title:"Movie Recommendation Engine", desc:"Collaborative filtering on MovieLens. Recommend top-10 similar movies.", solution_url:"https://github.com/topics/movie-recommendation-system", tags:["sklearn","cosine similarity","NLP"] },
  { week:9, title:"Handwritten Digit Recogniser", desc:"Train CNN on MNIST, build Streamlit UI to draw and predict digits.", solution_url:"https://github.com/topics/mnist-classification", tags:["Keras","CNN","Streamlit"] },
  { week:10, title:"Face Mask Detector", desc:"Fine-tune MobileNet on face mask dataset. Deploy with OpenCV + webcam.", solution_url:"https://github.com/topics/face-mask-detection", tags:["OpenCV","TensorFlow","Transfer Learning"] },
  { week:11, title:"ML Model API", desc:"Wrap your best model in FastAPI with Swagger docs.", solution_url:"https://fastapi.tiangolo.com/tutorial/", tags:["FastAPI","Docker","REST API"] },
  { week:12, title:"Mock Interview Bot", desc:"Chatbot that asks ML interview questions and evaluates answers using LLM.", solution_url:"https://github.com/topics/interview-preparation", tags:["LangChain","Ollama","Streamlit"] },
];

/* =================== ACHIEVEMENTS =================== */
const ACHIEVEMENTS = [
  { id:"a1",  icon:"◈", name:"FIRST_BLOOD",     desc:"Solve your first problem",           condition:s=>Object.keys(s.solved).length>=1 },
  { id:"a2",  icon:"◉", name:"TRIPLE_THREAT",   desc:"Solve 3 problems",                   condition:s=>Object.keys(s.solved).length>=3 },
  { id:"a3",  icon:"▣", name:"CONSISTENT",      desc:"Complete 3 roadmap weeks",           condition:s=>Object.keys(s.weeks).length>=3 },
  { id:"a4",  icon:"◆", name:"HALF_WAY",        desc:"Complete 6 weeks",                   condition:s=>Object.keys(s.weeks).length>=6 },
  { id:"a5",  icon:"⬡", name:"HARD_MODE",       desc:"Solve a hard problem",               condition:s=>Object.keys(s.solved).some(id=>ALL_PROBLEMS.find(p=>p.id===id)?.diff==='hard') },
  { id:"a6",  icon:"★", name:"XP_500",          desc:"Earn 500 XP",                        condition:s=>s.xp>=500 },
  { id:"a7",  icon:"✦", name:"XP_1000",         desc:"Earn 1000 XP",                       condition:s=>s.xp>=1000 },
  { id:"a8",  icon:"⬢", name:"XP_5000",         desc:"Earn 5000 XP — Elite",               condition:s=>s.xp>=5000 },
  { id:"a9",  icon:"◎", name:"GRADUATE",        desc:"Complete all 12 weeks",              condition:s=>Object.keys(s.weeks).length>=12 },
  { id:"a10", icon:"⚡", name:"SPEED_RUN",       desc:"5 timer sessions completed",         condition:s=>(s.timerSessions||[]).length>=5 },
  { id:"a11", icon:"🧠", name:"INTERVIEW_READY", desc:"Solve 10 interview questions",       condition:s=>Object.keys(s.solved).filter(id=>ALL_PROBLEMS.find(p=>p.id===id)?.type==='interview').length>=10 },
  { id:"a12", icon:"🏆", name:"CENTURION",      desc:"Solve all problems",                 condition:s=>Object.keys(s.solved).length>=ALL_PROBLEMS.length },
];

/* =================== BOOT MESSAGES =================== */
const BOOT_MESSAGES = [
  { text:"UEFI BIOS v3.2.1  |  Secure Boot: ENABLED",            cls:"sys",  delay:0    },
  { text:"POST check........................................PASS",  cls:"ok",   delay:160  },
  { text:"CPU  Neural-X 9900K @ 4.8GHz.....................[OK]",  cls:"ok",   delay:300  },
  { text:"RAM  32 GB DDR5-6400 ECC.........................[OK]",  cls:"ok",   delay:430  },
  { text:"GPU  RTX 4090 24 GB  CUDA 12.4...................[OK]",  cls:"ok",   delay:550  },
  { text:"SSD  NVMe 2TB  R:7400 MB/s......................[OK]",   cls:"ok",   delay:660  },
  { text:"NET  eth0 connected  192.168.1.x................[OK]",   cls:"ok",   delay:760  },
  { text:"",                                                        cls:"sys",  delay:850  },
  { text:">> Loading AI/ML kernel...",                              cls:"sys",  delay:900  },
  { text:"   python3.11         stdlib + venv..............[OK]",  cls:"ok",   delay:1010 },
  { text:"   numpy-2.0          vectorised ops..............[OK]", cls:"ok",   delay:1100 },
  { text:"   scikit-learn       150+ algorithms.............[OK]", cls:"ok",   delay:1185 },
  { text:"   torch-2.3          CUDA backend available......[OK]", cls:"ok",   delay:1265 },
  { text:"   langchain          RAG pipelines...............[OK]", cls:"ok",   delay:1340 },
  { text:"   faiss-cpu          vector store................[OK]", cls:"ok",   delay:1415 },
  { text:"   [WARN] ollama: bge-m3 running on CPU - slow",         cls:"warn", delay:1510 },
  { text:"   livekit-agents     real-time AI..............[OK]",   cls:"ok",   delay:1590 },
  { text:"",                                                        cls:"sys",  delay:1660 },
  { text:">> Mounting filesystems...",                              cls:"sys",  delay:1700 },
  { text:"   /dev/aiml-academy  ext4  rw...................[OK]",   cls:"ok",   delay:1800 },
  { text:"   /dev/projects      ext4  rw...................[OK]",   cls:"ok",   delay:1870 },
  { text:"",                                                        cls:"sys",  delay:1930 },
  { text:">> Loading profile: martial@bangalore",                   cls:"sys",  delay:1970 },
  { text:"   XP data...................................restored",    cls:"ok",   delay:2080 },
  { text:"   Session state.............................restored",    cls:"ok",   delay:2160 },
  { text:"   Roadmap progress..........................restored",    cls:"ok",   delay:2240 },
  { text:"",                                                        cls:"sys",  delay:2310 },
  { text:">> Connecting code runner: emkc.org/api/v2/piston",       cls:"sys",  delay:2350 },
  { text:"   Python 3.10 sandbox.......................online",      cls:"ok",   delay:2470 },
  { text:"",                                                        cls:"sys",  delay:2540 },
  { text:"ALL SYSTEMS NOMINAL.  WELCOME BACK, MARTIAL.",            cls:"ok",   delay:2580 },
  { text:">> AI/ML ACADEMY v3.0  //  HACK THE FUTURE",              cls:"sys",  delay:2720 },
];
