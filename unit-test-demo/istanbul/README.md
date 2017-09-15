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

���ؽ����ʾ��simple.js ��4����䣨statement����ִ����3����
��2����֧��branch����ִ����1����
��0��������������0����
��4�д��룬ִ����3�С�


������ɽ��

    istanbul check-coverage --statement 90

    ERROR: Coverage for statements (75%) does not meet global threshold (90%)

��������������串���ʵ��ż��� 90% ������ͱ����ˣ���Ϊʵ�ʸ�����ֻ��75%��


    istanbul check-coverage --statement -1

��������ʹ�ø�������ʾ����ֵ�ż���
����һ������������Ӿ�ͨ���˸����ʲ��ԣ������ٱ����ˡ�

    istanbul check-coverage --statement -5 --branch -3 --function 100

��������������3���������ż���5����䡢3�� if ����顢100%�ĺ�����
�������ż���"��"��and���Ĺ�ϵ��ֻҪ��һ��û�д�꣬�ͻᱨ��

    istanbul cover _mocha
    // or
    istanbul cover _mocha test/test.sqrt.js
	//�ϱ�����Ҳ���о������
	istanbul cover -hook-run-in-content node_modules/mocha/bin/_mocha

      sqrt
        ? 4��ƽ����Ӧ�õ���2 
        ? ����Ϊ��ֵʱӦ�ñ��� 

      2 passing (7ms)

    ===== Coverage summary =====
    Statements   : 100% ( 5/5 )
    Branches     : 100% ( 2/2 )
    Functions    : 100% ( 1/1 )
    Lines        : 100% ( 4/4 )
    =============================

���������У�istanbul cover ������������ _mocha ���ǰ����»����ǲ���ʡ�Եġ�

mocha �� _mocha ��������ͬ�����ǰ�߻��½�һ������ִ�в��ԣ����������ڵ�ǰ���̣��� istanbul ���ڵĽ��̣�ִ�в��ԣ�
ֻ�������� istanbul �ŻᲶ׽�����������ݡ�
�������Կ��Ҳ����ˣ�������ͬһ������ִ�в��ԡ�


���Ҫ�� mocha �������������д����������ӡ�

    istanbul cover _mocha -- tests/test.sqrt.js -R spec

���������У����������ߺ���Ĳ��֣����ᱻ������������ Mocha ��
������������������ߣ����Ǿͻᱻ���� istanbul �Ĳ���


istanbul �ṩע���﷨������ĳЩ���벻���븲���ʡ�

    var object = parameter || /* istanbul ignore next */ {};

���������Ϊ object ָ��Ĭ��ֵ��һ���ն��󣩡�
�����������ԭ��û��Ϊ object Ϊ�ն�������д���ԣ�������ע�ͣ���������������븲���ʡ�
ע�⣬ע��Ҫд��"��"������ĺ��档

    /* istanbul ignore if  */
    if (hardToReproduceError)) {
        return callback(hardToReproduceError);
    }

�������� if ���飬�ڼ��㸲���ʵ�ʱ��ᱻ���ԡ�




