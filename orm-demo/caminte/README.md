npm install caminte --save

npm install caminte-cli -g
npm install caminte-cli --save-dev

npm install pg --save
npm install redis --save
npm install redis pg --save

  Usage: caminte [options] [name] [fields]

  Options:

    -h, --help                        output usage information
    -V, --version                     output the version number
    -i, --init                        create structure and config
    -a, --adapter [name]              database adapter (mysql|redis|etc...)
    -m, --model <modelname> [fields]  create data model
    -r, --route <routename>           create data routes
    -c, --crud  <crudname>  [fields]  create model and route
    -d, --dump  <dumpfile>            parse sql dump file
    -t, --tests                       add tests
    -f, --force                       force on non-empty directory

	