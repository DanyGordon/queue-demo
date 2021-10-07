(function() {
  const LIMIT = 20;

  let queue = new Queue();
  const queueContainer = document.querySelector('.queue');

  buildQueueFromStorage();

  const input = document.querySelector('#in-queue');
  const enqueueController = document.querySelector('#enqueue');
  const dequeueController = document.querySelector('#dequeue');

  input.form.addEventListener('submit', enqueueHandler);
  enqueueController.addEventListener('click', enqueueHandler);
  dequeueController.addEventListener('click', dequeueHandler);

  function enqueueHandler() {
    if(validateInput(input.value) && queue.length < LIMIT) {
      enqueueItem(input.value);
      saveQueueState();
    } else {
      if(!validateInput(input.value)) {
        alert('Please input some value before enqueue');
      } else if(queue.length === LIMIT) {
        alert('Queue can\'t be longer than 20 items');
      }
    }
    input.value = '';
  }

  function dequeueHandler() {
    if(queue.length > 0) {
      dequeueItem();
      saveQueueState();
    } else {
      alert('You can\'t dequeue item from empty queue')
    }
  }

  function validateInput(value) {
    return value.trim().length > 0;
  }

  function enqueueItem(item) {
    queue.enqueue(item);
    queueContainer.prepend(createQueueItem(item));
  }

  function dequeueItem() {
    queue.dequeue();
    const indx = queueContainer.children.length - 1;
    queueContainer.removeChild(queueContainer.children[indx]);
    if(queueContainer.children.length) {
      queueContainer.children[indx - 1].classList.add('first');
    }
  }

  function buildQueueFromStorage() {
    if(localStorage.getItem('queue')) {
      const arrayFromQueue = localStorage.getItem('queue').split(',');
      for(let i = 0; i < arrayFromQueue.length; i++) {
        enqueueItem(arrayFromQueue[i]);
      }
      queue = queue.arrayToQueue(arrayFromQueue);
    }
  }

  function saveQueueState() {
    const arrayFromQueue = queue.toArray();
    arrayFromQueue.length 
      ? localStorage.setItem('queue', arrayFromQueue.join(',')) 
      : localStorage.removeItem('queue');
  }

  function createQueueItem(item) {
    const queueItem = document.createElement('div');
    const containerWidth = getComputedStyle(queueContainer).width;
    queueItem.classList.add('queue-item');
    if(queue.length === 1) {
      queueItem.classList.add('first');
    }
    queueItem.innerHTML = item;
    queueItem.style.width = parseInt(containerWidth) / LIMIT - 16 + 'px';
    return queueItem;
  }
})();