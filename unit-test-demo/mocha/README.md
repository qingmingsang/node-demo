npm install eslint -g 
npm install eslint --save
npm install babel-eslint -g
npm install babel-eslint --save
npm install eslint-config-standard -g
npm install eslint-config-standard --save
npm install eslint-plugin-promise eslint-plugin-standard  -g
npm install eslint-plugin-promise eslint-plugin-standard  --save


npm install mocha -g 
npm install mocha --save

npm install mochawesome -g 
npm install  mochawesome --save

npm install babel-core babel-preset-es2015 -g
npm install babel-core babel-preset-es2015 --save
npm install babel-preset-stage-0 -g

npm install babel-core babel-preset-es2015 babel-preset-stage-0 --save

npm install chai --save-dev

npm install superagent --save-dev
npm install node-fetch --save-dev

mocha add.test.js

mocha命令后面紧跟测试脚本的路径和文件名，可以指定多个测试脚本。
mocha file1 file2 file3

Mocha默认运行test子目录里面的测试脚本。
所以，一般都会把测试脚本放在test目录里面，然后执行mocha就不需要参数了。
但是，Mocha默认只执行test子目录下面第一层的测试用例，不会执行更下层的用例。
加上--recursive参数，这时test子目录下面所有的测试用例都会执行。

mocha spec/{my,awesome}.js
指定执行spec目录下面的my.js和awesome.js。

mocha test/unit/*.js
指定执行test/unit目录下面的所有js文件。

mocha 'test/**/*.@(js|jsx)'
运行test目录下面任何子目录中、文件后缀名为js或jsx的测试脚本。
注意，Node的通配符要放在单引号之中，否则星号（*）会先被Shell解释。

上面这行Node通配符，如果改用Shell通配符，要写成下面这样。
mocha test/{,**/}*.{js,jsx}

	
--help, -h 
查看Mocha的所有命令行参数。
mocha --help

--reporter, -R
--reporter参数用来指定测试报告的格式，默认是spec格式。
mocha
等同于
mocha --reporter spec

除了spec格式，官方网站还提供了其他许多报告格式。
mocha --reporter tap

    1..2
    ok 1 加法函数的测试 1 加 1 应该等于 2
    ok 2 加法函数的测试 任何数加0应该等于自身
    # tests 2
    # pass 2
    # fail 0

上面是tap格式报告的显示结果。

--reporters参数可以显示所有内置的报告格式。
mocha --reporters

使用mochawesome模块，可以生成漂亮的HTML格式的报告。
mocha --reporter mochawesome 
上面代码中，mocha命令使用了项目内安装的版本，而不是全局安装的版本，
因为mochawesome模块是安装在项目内的。

--growl, -G
打开--growl参数，就会将测试结果在桌面显示。
mocha --growl

--watch，-w
--watch参数用来监视指定的测试脚本。只要测试脚本有变化，就会自动运行Mocha。
mocha --watch
上面命令执行以后，并不会退出。
可以另外打开一个终端窗口，修改test目录下面的测试脚本add.test.js，比如删除一个测试用例，一旦保存，Mocha就会再次自动运行。

--bail, -b
--bail参数指定只要有一个测试用例没有通过，就停止执行后面的测试用例。这对持续集成很有用。
mocha --bail

--grep, -g
--grep参数用于搜索测试用例的名称（即it块的第一个参数），然后只执行匹配的测试用例。
mocha --grep "1 加 1"
上面代码只测试名称中包含"1 加 1"的测试用例。

--invert, -i
--invert参数表示只运行不符合条件的测试脚本，必须与--grep参数配合使用。
mocha --grep "1 加 1" --invert


mocha --recursive --reporter tap --growl
上面这个命令有三个参数--recursive、--reporter tap、--growl。
然后，把这三个参数写入test目录下的mocha.opts文件。
    --reporter tap
    --recursive
    --growl
然后，执行mocha就能取得与第一行命令一样的效果。
mocha
如果测试用例不是存放在test子目录，可以在mocha.opts写入以下内容。
    server-tests
    --recursive
上面代码指定运行server-tests目录及其子目录之中的测试脚本。

ES6测试
mocha --compilers js:babel-core/register

异步测试：
Mocha默认每个测试用例最多执行2000毫秒，如果到时没有得到结果，就报错。
对于涉及异步操作的测试用例，这个时间往往是不够的，需要用-t或--timeout参数指定超时门槛。
	mocha -t 5000 timeout.test.js

Mocha默认会高亮显示超过75毫秒的测试用例，可以用-s或--slow调整这个参数。
	mocha -t 5000 -s 1000 timeout.test.js
上面命令指定高亮显示耗时超过1000毫秒的测试用例。

Mocha内置对Promise的支持，允许直接返回Promise，等到它的状态改变，再执行断言，而不用显式调用done方法。






