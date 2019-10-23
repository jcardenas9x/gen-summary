# gen-summary

Command line utility that can be called to parse a specific Markdown file into a SUMMARY.json file or dictionary with the following format:

```javascript
{
  "array": [
    {
      "title": "Link Title",
      "link": "file.md",
      "sub": [
        {
          "title": "Link Title 3",
          "link": "file3.md",
          "sub": [ ... ]
        },
        ...
      ]
    },
    {
      "title": "Link Title 2",
      "link": "file2.md"
    }
  ],
  "title": ""
}
```

## How to Install

1. Clone the repository
2. Navigate to the root and run `npm install`
3. Run `npm run build`
4. The utility can be used by calling `gensum`
5. Test that you have the utility working by running `gensum -v` to get the version number.
6. You can also try `gensum -h` or `gensum --help`

## How to Use

This repository comes with a `sample` folder in the root directory of this repository containing two identical Markdown files aside from their filenames. The tool will not work if you use `sample.md`, since it should only work with files named `SUMMARY.md` or `summary.md`. You can use those files to mess around with development.

### Commands

* [`verify`](#verify---verify-markdown-file)
* [`generate`](#generate---generate-summaryjson-or-summary-dictionary)

#### `verify` - Verify Markdown File

```bash
gensum verify [options] <path> [src]   
```

Available Options:

* `-a, --abs` - Ignores `[src]` and assumes `<path>` is an absolute filepath.

Available Arguments:

* `<path>` - Required argument. The filepath of the Markdown file. 
* `[src]` - Optional argument. If specified, the Markdown file's path will become relative to the directory specified in this folder. **If not specified, gensum will use the current working directory**.

#### `generate` - Generate SUMMARY.json or SUMMARY dictionary

```bash
gensum generate [options] <path> [src]
```

Alias: `gen`

Available Options:

* `-a --abs` - Ignores `[src]` and assumes `<path>` is an absolute filepath.
* `-j --outjson` - Outputs the summary dictionary as `SUMMARY.json` instead of just outputting the summary dictionary

Available Arguments:

* `<path>` - Required argument. The filepath of the Markdown file. 
* `[src]` - Optional argument. If specified, the Markdown file's path will become relative to the directory specified in this folder. **If not specified, gensum will use the current working directory**.
