## 参考资料

[珠峰架构师课程](http://www.zhufengpeixun.cn/main/course/index.html)

## 注解
Koa和Express的优秀之处在于框架的设计，实现思路本质上一样，就是请求到来时依次触发回调，异步串行的简单逻辑。两者的一处明显区别是Koa的回调要全部返回的是Promise，用以支持async、await