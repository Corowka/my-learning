# 10-Дневный LeetCode Челлендж: Чек-лист

## День 1: Массивы и строки – Часть 1
- [x] **Two Sum**  
  *Цель:* Освоение базового поиска с использованием хеш-таблиц.  
  **Решение**
  ```ts
  function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>()
    for (let i = 0; i < nums.length; i++) {
        const num = target - nums[i]
        if (map.has(num)) {
            return [i, map.get(num)]
        }
        map.set(nums[i], i)
    }
    return []
  };
  ```
  **Заметки:**  
  - Заметки по условию, подходу и оптимизациям.
- [x] **Best Time to Buy and Sell Stock**  
  *Цель:* Решение задачи одним проходом по массиву.  
  **Решение**
  ```ts
  function maxProfit(prices: number[]): number {
      let benefit = 0
      let min = 0
      for (let i = 1; i < prices.length; i++) {
          if (prices[min] > prices[i]) {
              min = i
              continue
          }
          const currentBenefit = prices[i] - prices[min]
          if (benefit < currentBenefit) {
              benefit = currentBenefit
          }
      }
      return benefit
  };
  ```
  **Лучшее решение**
  ```ts
  function maxProfit(prices: number[]): number {
      let min = prices[0]
      let profit = 0
      for (let i = 1; i < prices.length; i += 1) {
          if (prices[i] < min) min = prices[i]; 
          if (prices[i] - min > profit) profit = prices[i] - min;
      }
      return profit;
  };
  ```
  **Вывод:**
  В этой задаче достаточно было хранить значение, а не индекс.
  **Заметки:**  
  - Запиши основные моменты решения и тест-кейсы.
  
- [x] **Longest Substring Without Repeating Characters**  
  *Цель:* Применение техники sliding window для поиска подстроки. 
  **Решение**
  ```ts
  function lengthOfLongestSubstring(s: string): number {
    const map = new Map<string, number>()
    let maxLength = 0
    let [left, right] = [0, 0]
    while (right !== s.length) {
      if (map.has(s[right])) {
        maxLength = Math.max(maxLength, right - left)
        const pos = map.get(s[right])
        for (let i = left; i < pos; i++) {
            map.delete(s[i])
        }
        left = pos + 1
      }
      map.set(s[right], right)
      right++
    }
    maxLength = Math.max(maxLength, right - left)
    return maxLength
  };
  ``` 
  **Лучшее решение**
  ```ts
  function lengthOfLongestSubstring(s: string): number {
    const map: Map<string, number> = new Map();
        let left = 0;
        let max = 0;
        for (let right = 0; right < s.length; right++) {
          const value = s.charAt(right);
          if (map.has(value)) {
            left = Math.max(map.get(value)! + 1, left);
          }
          map.set(value, right);
          max = Math.max(max, right - left + 1);
        }
        return max;
  };
  ```
  **Вывод**
  Если операция повторяется 2 раза, значит где-то алгоритм построен не оптимально.
  **Заметки:**  
  - Выводы о применении скользящего окна и оптимальных подходах.

## День 2: Массивы и строки – Часть 2
- [x] **Product of Array Except Self**  
  *Цель:* Работа с префиксами и суффиксами без деления.  
  **Решение**
  ```ts
  function productExceptSelf(nums: number[]): number[] {
    let [left, right] = [1, 1]
    const result = Array.from({ length: nums.length }, () => 1)
    for (let i = 0; i < nums.length; i++) {
      result[nums.length - 1 - i] *= right
      result[i] *= left
      left *= nums[i]
      right *= nums[nums.length - 1 - i]
    }
    return result
  };
  ```
  **Лучшее решение**
  ```ts
  function productExceptSelf(nums: number[]): number[] {
    let prefix = 1;
    let postfix = 1;
    const outputArray = new Array<number>(nums.length);
    outputArray[0] = prefix
    for (let i = 0; i < nums.length; i++) {
      outputArray[i] = prefix
      prefix *= nums[i]
    }
    for (let i = nums.length - 1; i >= 0; i--) {
      outputArray[i] *= postfix
      postfix *= nums[i]
    }
    return outputArray;
  };
  ```
  **Вывод**
  Лучше стремиться к работе с индексами по порядку, то есть разбиение на 2 цикла быстрее, чем моё решение.
  **Заметки:**  
  - Алгоритмический подход и нюансы реализации.

- [x] **Valid Anagram**  
  *Цель:* Обработка строк через сортировку или подсчёт частоты символов.  
  **Решение**
  ```ts
  function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false
    const smap = new Map<string, number>()
    const tmap = new Map<string, number>()
    for (let i = 0; i < s.length; i++) {
      smap.set(s[i], (smap.get(s[i]) || 0) + 1)
      tmap.set(t[i], (tmap.get(t[i]) || 0) + 1)
    }
    for (let key of smap.keys()) {
      if (smap.get(key) !== tmap.get(key)) return false
    }
    return true
  };
  ```
  **Лучшее решение**
  ```ts
  function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false
    const arr = new Array(26).fill(0)
    for (let i = 0; i < s.length; i++) {
      arr[s.charCodeAt(i) - 'a'.charCodeAt(0)]++
      arr[t.charCodeAt(i) - 'a'.charCodeAt(0)]--
    }
    return arr.every(c => c === 0)
  };
  ```
  **Вывод**
  Для лучшей скорости и решения нужно не выходить за рамки входных данных и делать не универсальный код, а код строго решающий поставленную задачу.
  **Заметки:**  
  - Что было учтено при проверке анаграмм и идеи для оптимизации.

## День 3: Связанные списки и базовые стеки
- [x] **Reverse Linked List**  
  *Цель:* Реверсирование односвязного списка.  
  **Решение**
  ```ts
  function reverseList(head: ListNode | null): ListNode | null {
    if (head === null) return null
    let left = head
    if (head.next === null) return head
    let mid = head.next
    left.next = null
    while (mid !== null) {
      const right = mid.next
      mid.next = left
      left = mid 
      mid = right
    }
    return left
  };
  ```
  **Лучшее решение**
  ```ts
  const reverseList = (head: ListNode | null) => {
    let prev = null
    while (!!head) {
        let temp = head.next
        head.next = prev
        prev = head
        head = temp
    }
    return prev
  }
  ```
  **Заметки:**  
  - Процесс реверсирования и важные моменты по памяти.

- [x] **Merge Two Sorted Lists**  
  *Цель:* Объединение двух отсортированных списков.  
  **Решение**
  ```ts
  function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    if (list1 === null) return list2
    if (list2 === null) return list1
    const head = new ListNode()
    let node = head
    while (!!list1 && !!list2) {
      if (list1.val <= list2.val) {
        node.next = list1
        list1 = list1.next
      } else {
        node.next = list2
        list2 = list2.next
      }
      node = node.next
    }
    node.next = !!list1 ? list1 : list2
    return head.next
  };
  ```
  **Лучшее решение**
  ```ts
  function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    const dummy = new ListNode();
    let current = dummy;
    while(list1 && list2){
      if(list1.val < list2.val){
        current.next = list1;
        list1 = list1.next;
      }else{
        current.next = list2;
        list2 = list2.next;
      }
      current = current.next;
    }
    current.next = list1 ?? list2;
    return dummy.next
  };
  ```
  **Вывод**
  Для конструкции `node.next = !!list1 ? list1 : list2` можно использовать `current.next = list1 ?? list2;`
  Для итерации по списку мы создаем `node` и в цикле применяем `node = node.next`
  **Заметки:**  
  - Результаты тестирования и альтернативные подходы.

- [x] **Valid Parentheses**  
  *Цель:* Проверка корректности скобочной последовательности с использованием стека. 
  **Решение**
  ```ts
  function isValid(s: string): boolean {
    const stack = []
    for (let i = 0; i < s.length; i++) {
      switch (s[i]) {
        case '{':
        case '[':
        case '(':
            stack.push(s[i])
            break
        default:
            if (!stack.length || Math.abs(stack.pop().charCodeAt(0) - s[i].charCodeAt(0)) > 2) 
              return false
      }
    }
    return !stack.length
  }; 
  ```
  **Лучшее решение**
  ```ts
  function isValid(s: string): boolean {
    let stack = [];
    let sIdx = 0;
    const bracketMap = {
      '}': '{',
      ')': "(",
      ']': '['
    }
    while (sIdx < s.length) {
      let char = s[sIdx];
      if (char === '(' || char === '{' || char === '[') {
        stack.push(char)
      } else if (char === '}' || char === ']' || char === ')') {
        const openBracket = bracketMap[char];
        if (openBracket !== stack[stack.length - 1]) {
          return false;
        }
        stack.pop();
      }
      sIdx++;
    }
    return stack.length === 0;
  }
  ```
  **Вывод**
  Для проверки пар значений нужно использовать `Map`
  **Заметки:**  
  - Особенности реализации стека и проверка граничных условий.

## День 4: Продвинутые задачи на стеки/очереди
- [x] **Min Stack**  
  *Цель:* Реализация стека с дополнительной возможностью поиска минимума.
  **Решение**
  ```ts
  class MinStack {
    private stack: number[]
    private minStack: number[]

    constructor() {
        this.stack = []
        this.minStack = []
    }

    push(val: number): void {
        this.stack.push(val)
        if (this.stack.length === 1) {
            this.minStack.push(val)
            return
        }
        this.minStack.push(Math.min(this.minStack[this.minStack.length - 1], val))
    }

    pop(): void {
        this.stack.pop()
        this.minStack.pop()
    }

    top(): number {
        return this.stack[this.stack.length - 1]
    }

    getMin(): number {
        return this.minStack[this.minStack.length - 1]
    }
  }
  ```
  **Вывод**
  Операция `Math.min` намного быстрее сравнения `(a < b) ? a : b`
  Лучше использовать не `[number, number][]`, а два массива `number[]`
  **Заметки:**  
  - Детали реализации и тесты на корректность работы.

- [ ] **Daily Temperatures**  
  *Цель:* Использование монотонного стека для решения задачи.  
  **Решение**
  ```ts
  function dailyTemperatures(temperatures: number[]): number[] {
    const result = [0]
    for (let i = temperatures.length - 1; i > 0; i--) {
      if (temperatures[i] === temperatures[i - 1]) {
        const value = result[result.length - 1] !== 0 ? result[result.length - 1] + 1 : 0
        result.push(value)
        continue
      }
      if (temperatures[i] > temperatures[i - 1]) {
        result.push(1)
        continue
      }
      let j = 1
      while (true) {
        if (i + j === temperatures.length) {
          result.push(0)
          break
        }
        if (temperatures[i - 1] < temperatures[i + j]) {
          result.push(j + 1)
          break
        }
        j++
      }
    }
    return result.reverse()
  };
  ```
  **Лучшее решение**
  ```ts
  function dailyTemperatures(temps: number[]): number[] {
    let answers = Array(temps.length).fill(0);
    for (let i = temps.length - 2; i >= 0; i--) {
      let prev = i + 1;
      do {
        if (temps[i] < temps[prev]) break;
        prev += answers[prev];
      } while (answers[prev] != 0);
      if (temps[i] < temps[prev])
        answers[i] = prev - i;
    }
    return answers;
  };
  ```
  **Вывод**
  
  **Заметки:**  
  - Сложности при реализации монотонного стека и ключевые инсайты.

## День 5: Деревья и графы – Часть 1
- [ ] **Maximum Depth of Binary Tree**  
  *Цель:* Рекурсивное определение глубины бинарного дерева.  
  **Заметки:**  
  - Примечательные детали рекурсии и возможные улучшения.

- [ ] **Binary Tree Inorder Traversal**  
  *Цель:* Изучение рекурсивного и итеративного подходов.  
  **Заметки:**  
  - Сравнение двух подходов, плюсы и минусы каждого.

- [ ] **Same Tree**  
  *Цель:* Рекурсивное сравнение двух деревьев на идентичность.  
  **Заметки:**  
  - Критерии сравнения и рассмотренные граничные случаи.

## День 6: Деревья и графы – Часть 2
- [ ] **Invert Binary Tree**  
  *Цель:* Инвертирование структуры бинарного дерева.  
  **Заметки:**  
  - Эффективность решения и инсайты по изменению структуры.

- [ ] **Number of Islands**  
  *Цель:* Применение DFS/BFS для обхода графа и подсчёта изолированных островов.  
  **Заметки:**  
  - Сравнение DFS и BFS, сложности алгоритма.

## День 7: Динамическое программирование – Введение
- [ ] **Climbing Stairs**  
  *Цель:* Введение в DP через подсчёт количества способов.  
  **Заметки:**  
  - Основные идеи динамического программирования, рекурсия vs итерация.

- [ ] **House Robber**  
  *Цель:* Применение DP для выбора оптимального набора с учётом ограничений.  
  **Заметки:**  
  - Анализ перебора вариантов и оптимизация.

- [ ] **Coin Change**  
  *Цель:* Классическая задача по нахождению минимального числа монет.  
  **Заметки:**  
  - Подробное разбиение задачи и варианты оптимального решения.

## День 8: Динамическое программирование – Продвинутые задачи
- [ ] **Longest Increasing Subsequence**  
  *Цель:* Поиск подпоследовательности с использованием DP.  
  **Заметки:**  
  - Анализ сложности и сравнение с альтернативными алгоритмами.

- [ ] **Maximum Subarray**  
  *Цель:* Решение задачи методом Кадане для поиска максимальной суммы.  
  **Заметки:**  
  - Применение алгоритма Кадане и возможные улучшения.

## День 9: Поиск, сортировка и интервальные задачи
- [ ] **Binary Search**  
  *Цель:* Реализация бинарного поиска (рекурсивно и итеративно).  
  **Заметки:**  
  - Важные моменты реализации и проверка крайних условий.

- [ ] **Search Insert Position**  
  *Цель:* Модифицированный бинарный поиск для определения позиции вставки.  
  **Заметки:**  
  - Особенности решения и тестирование различных случаев.

- [ ] **Find First and Last Position of Element in Sorted Array**  
  *Цель:* Углубление навыков бинарного поиска.  
  **Заметки:**  
  - Стратегия поиска границ и идеи оптимизации.

- [ ] **Merge Intervals**  
  *Цель:* Объединение пересекающихся интервалов после сортировки.  
  **Заметки:**  
  - Алгоритм сортировки и особенности объединения интервалов.

- [ ] **Insert Interval**  
  *Цель:* Добавление нового интервала с корректной обработкой пересечений.  
  **Заметки:**  
  - Разбор граничных условий и сценариев.

## День 10: Backtracking и комбинаторные задачи
- [ ] **Permutations**  
  *Цель:* Генерация всех перестановок с помощью backtracking.  
  **Заметки:**  
  - Особенности рекурсии, обработка повторов.

- [ ] **Subsets**  
  *Цель:* Вывод всех возможных подмножеств заданного множества.  
  **Заметки:**  
  - Алгоритмическая стратегия и анализ сложности.

- [ ] **Combination Sum**  
  *Цель:* Поиск комбинаций с повторениями с использованием backtracking.  
  **Заметки:**  
  - Детали реализации и способы уменьшения времени выполнения.

- [ ] **Word Search**  
  *Цель:* Поиск слова в двумерном массиве с помощью backtracking.  
  **Заметки:**  
  - Особенности обхода двумерного массива и оптимизация рекурсии.

- [ ] **N-Queens**  
  *Цель:* Решение классической задачи расстановки N ферзей с ограничениями.  
  **Заметки:**  
  - Стратегия поиска, оптимизация и принципы отсечения.
  
---

# Общие рекомендации при решении задач

- **Анализ условия:**  
  Тщательно изучай условие, ограничения и особенности входных данных.

- **Определение типа задачи:**  
  Определи, к какой категории относится задача (массивы, строки, DP, деревья и т.д.), чтобы быстрее выбрать паттерн решения.

- **Разработка плана:**  
  Сформулируй алгоритмический план (на бумаге или мысленно) перед кодированием.

- **Кодирование:**  
  Реализуй решение, уделяя внимание чистоте и читабельности кода (не забывай комментарии).

- **Тестирование:**  
  Протестируй решение на простых и граничных тест-кейсах. Постарайся придумать дополнительные тесты.

- **Ретроспектива:**  
  После выполнения решения проверь:
  - Какие алгоритмические паттерны и принципы использовались.
  - Можно ли оптимизировать решение.
  - Какие ошибки были допущены и как их избежать в будущем.

- **Анализ чужих решений:**  
  Сравни своё решение с другими подходами на LeetCode и обрати внимание на альтернативные методы оптимизации.

- **Запись размышлений:**  
  Веди дневник или записные заметки с выводами для закрепления опыта.

---

Удачи в выполнении челленджа и развитии алгоритмических навыков!
