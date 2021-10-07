class Queue {
  #length = 0

  constructor() {
    this.first = null
    this.last = null
  }

  enqueue(data) {
    const item = { value: data, next: null }

    if(this.last) {
      this.last.next = item
    }

    if(!this.first) {
      this.first = item
    }

    this.last = item
    this.#length++
    return this
  }

  dequeue() {
    const dequeued = this.first
    this.first = this.first.next
    if(!this.first) {
      this.last = null
    }
    this.#length--
    return dequeued
  }

  peek() {
    return this.first.value
  }

  toArray() {
    const result = []
    let current = this.first
    while(current) {
      result.push(current.value);
      current = current.next;
    }
    return result
  }

  arrayToQueue(array) {
    const queue = new Queue()
    for(let i = 0; i < array.length; i++) {
      queue.enqueue(array[i])
    }
    return queue;
  }

  get length() {
    return this.#length
  }
}