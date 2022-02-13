hugo -d ~/Projects/Active/uphouseworks.com/
curDir=`pwd`
cd ~/Projects/Active/uphouseworks.com/
git add -A
git commit
git push
cd $curDir
