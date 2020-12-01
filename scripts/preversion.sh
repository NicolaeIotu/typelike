#!/bin/sh

# IMPORTANT
# trigger this with for example: npm version 1.1.1
# this must be done after submitting all commits to include in this version i.e. 1.1.1

if [ "${#}" -eq 0 ] || [ -z "${1}" ]; then
    echo 'preversion.sh: invalid input parameters!'
    exit 1
fi

if echo "${npm_package_version}" | grep -E "^[0-9]+\.[0-9]+\.[0-9]+$" >/dev/null ; then
    true
else
    echo 'preversion.sh: invalid npm_package_version!'
    exit 1
fi

# add here top level folders containing version dependent content
for version_dependent_folder in 'lib' ;
do
    find "./${version_dependent_folder}" -name "*.js" \
        -exec rm -f "{}.bak" ';' -a \
        -exec cp -f "{}" "{}.bak" ';' -a \
        -exec sh -c 'sed -i "s/${2}/${1}/g" "${0}"' "{}" "${1}" "${npm_package_version}"  ';' -a \
        -exec git add "{}" ';'
done

# at this point it's IMPORTANT to have jsdoc and dist files regenerated
# this is done here with npm test
