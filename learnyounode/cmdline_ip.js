var sum = 0;
for (var i=2, j=0; i < process.argv.length; i++, j++) {
	sum += Number(process.argv[i]);
}
console.log(sum);