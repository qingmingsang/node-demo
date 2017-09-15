npm install istanbul -g 
npm install istanbul --save

npm install mocha -g 
npm install mocha --save

istanbul cover simple.js

    ===== Coverage summary =====
    Statements   : 75% ( 3/4 )
    Branches     : 50% ( 1/2 )
    Functions    : 100% ( 0/0 )
    Lines        : 75% ( 3/4 )
    =============================

返回结果显示，simple.js 有4个语句（statement），执行了3个；
有2个分支（branch），执行了1个；
有0个函数，调用了0个；
有4行代码，执行了3行。


检查生成结果

    istanbul check-coverage --statement 90

    ERROR: Coverage for statements (75%) does not meet global threshold (90%)

上面命令设置语句覆盖率的门槛是 90% ，结果就报错了，因为实际覆盖率只有75%。


    istanbul check-coverage --statement -1

上面命令使用负数，表示绝对值门槛。
这样一来，上面的例子就通过了覆盖率测试，不会再报错了。

    istanbul check-coverage --statement -5 --branch -3 --function 100

上面命令设置了3个覆盖率门槛：5个语句、3个 if 代码块、100%的函数。
这三个门槛是"与"（and）的关系，只要有一个没有达标，就会报错。

    istanbul cover _mocha
    // or
    istanbul cover _mocha test/test.sqrt.js
	//上边这俩也不行就用这个
	istanbul cover -hook-run-in-content node_modules/mocha/bin/_mocha

      sqrt
        ? 4的平方根应该等于2 
        ? 参数为负值时应该报错 

      2 passing (7ms)

    ===== Coverage summary =====
    Statements   : 100% ( 5/5 )
    Branches     : 100% ( 2/2 )
    Functions    : 100% ( 1/1 )
    Lines        : 100% ( 4/4 )
    =============================

上面命令中，istanbul cover 命令后面跟的是 _mocha 命令，前面的下划线是不能省略的。

mocha 和 _mocha 是两个不同的命令，前者会新建一个进程执行测试，而后者是在当前进程（即 istanbul 所在的进程）执行测试，
只有这样， istanbul 才会捕捉到覆盖率数据。
其他测试框架也是如此，必须在同一个进程执行测试。


如果要向 mocha 传入参数，可以写成下面的样子。

    istanbul cover _mocha -- tests/test.sqrt.js -R spec

上面命令中，两根连词线后面的部分，都会被当作参数传入 Mocha 。
如果不加那两根连词线，它们就会被当作 istanbul 的参数


istanbul 提供注释语法，允许某些代码不计入覆盖率。

    var object = parameter || /* istanbul ignore next */ {};

上面代码是为 object 指定默认值（一个空对象）。
如果由于种种原因，没有为 object 为空对象的情况写测试，可以用注释，不将这种情况计入覆盖率。
注意，注释要写在"或"运算符的后面。

    /* istanbul ignore if  */
    if (hardToReproduceError)) {
        return callback(hardToReproduceError);
    }

上面代码的 if 语句块，在计算覆盖率的时候会被忽略。




