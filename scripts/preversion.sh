#!/bin/sh

# IMPORTANT
# trigger this with for example: npm version 1.1.1

#npm_package_version=0.3.8
#npm_new_version=0.3.9

# add here top level folders containing version dependent content
for version_dependent_folder in 'lib' ;
do
    find "./${version_dependent_folder}" -name "*.js" -type f \
        -exec echo "{}" ';' \
        -exec rm -f "{}.bak" ';' -a \
        -exec cp -f "{}" "{}.bak" ';' -a \
        -exec sh -c 'sed "s/${2}/${1}/g" "${0}.bak" > "${0}"' "{}" "${npm_package_version}" "${npm_new_version}" ';' -a \
        -exec git add "{}" ';'
done

# at this point it's IMPORTANT to have jsdoc and dist files regenerated
# this is done here with npm test
