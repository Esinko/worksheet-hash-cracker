# worksheet-hash-cracker
Crack Excel worksheet 2-byte hashes with Node.JS

This is a nice tool to have just in case someone forgets a worksheet password and you don't want to modify the document files to remove the password.
You can fine the password in the sheet<num>.xml files within the document (archive)

**Example Usage**
```
node crack-it.js <hash>
```

or using STDIN

```
node crack-it.js

Input the Excel Worksheet hash to crack
> <hash>
```

### License
```
MIT License; See LICENSE file
```