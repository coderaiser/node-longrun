import {run} from 'madrun';

export default {
    'test': () => 'tape \'test/**/*.js\'',
    'watch': () => 'nodemon --watch lib --watch test --exec',
    'watch:test': () => run('watch', '"npm test"'),
    'lint': () => 'putout .',
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'jscs-fix': () => run(['jscs', '--fix']),
    'coverage': () => 'nyc npm test',
    'watch:coverage': async () => await run('watch', await run('coverage')),
    'report': () => 'nyc report --reporter=text-lcov | coveralls',
};

