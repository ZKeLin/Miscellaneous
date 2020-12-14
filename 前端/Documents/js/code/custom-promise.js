class CustomPromise {
  constructor(handler) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;

    this.fulfillList = [];

    handler(this.triggerResolve.bind(this));
  }

  /**
   * 触发 resolve
   * @param value
   */
  triggerResolve(value) {
    setTimeout(() => {
      this.state = 'fulfilled';
      this.value = value;
      this.fulfillList.forEach(it => it(value));
      this.fulfillList = [];
    }, 0);
  }

  triggerRejected(reason) {

  }

  then(onFulfill, onReject) {
    let { state, value, reason } = this;

    const promiseInstance = new CustomPromise((onNextFulfill, onNextReject) => {
      function finalFulfill(val) {
        if(typeof onFulfill !== "function") {
          onNextFulfill(val);
        }else{
          let res = onFulfill(val);
          if(res && typeof res.then === "function"){
            res.then(onNextFulfill);
          }else{
            onNextFulfill(res);
          }
        }
      }

      switch (state) {
        case "pending":{
          this.fulfillList.push(finalFulfill);
          break;
        }
      }
    });

    return promiseInstance;
  }
}