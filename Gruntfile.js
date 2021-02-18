module.exports = function (grunt) {
  const __preferLocal = { preferLocal: true }
  const __preferNotLocal = { preferLocal: false }

  grunt.initConfig({
    // template vars
    __cwd: __dirname,

    // shell plugin
    shell: {
      purge: {
        command: [
          'npm install',
          'rm -f *.tgz',
          'rm -rf ./dist',
          'mkdir -p dist',
          'rm -rf ./docs',
          'mkdir -p docs',
          'npm uninstall',
          'rm -rf ./node_modules',
          'rm -rf ./.nyc_output'
        ].join(' && '),
        options: __preferNotLocal
      },
      eslintInit: {
        command: 'printf \'%s\n%s\n%s\n\' \'Use the following to initialize eslint:\' \'cd "<%= __cwd %>"\' ' +
                    '\'eslint --init\''
      },
      eslintFix: {
        command: 'eslint --fix -c "<%= __cwd %>/.eslintrc.json"',
        options: __preferLocal
      },
      eslintFixDryRun: {
        command: 'eslint --fix-dry-run -c "<%= __cwd %>/.eslintrc.json"',
        options: __preferLocal
      },
      jsdoc: {
        command: 'rm -rf "<%= __cwd %>/jsdoc" && jsdoc -c "<%= __cwd %>/scripts/jsdoc-conf.js" "<%= __cwd %>"'
      },
      prepublish: {
        command: 'npm publish --dry-run'
      },
      pretest: {
        command: 'grunt jsdoc && ' +
                    'terser --compress --comments false --output "<%= __cwd %>/dist/typelike.js" ' +
                    '-- "<%= __cwd%>/lib/typelike.js" && ' +
                    'browserify -e "<%= __cwd %>/dist/typelike.js" -o "<%= __cwd %>/dist/typelike.bundle.js" -s' +
                    ' typelikeBundled && ' +
                    'node "<%= __cwd %>/scripts/dist-files-insert-license.js"'
      }
    }
  })

  grunt.loadNpmTasks('grunt-shell')

  grunt.registerTask('default', ['shell:eslintFixDryRun'])
  grunt.registerTask('purge', ['shell:purge'])
  grunt.registerTask('eslintInit', ['shell:eslintInit'])
  grunt.registerTask('eslintFix', ['shell:eslintFix'])
  grunt.registerTask('eslintFixDryRun', ['shell:eslintFixDryRun'])
  grunt.registerTask('jsdoc', ['shell:jsdoc'])
  grunt.registerTask('prepublish', ['shell:prepublish'])
  grunt.registerTask('pretest', ['shell:pretest'])
}
