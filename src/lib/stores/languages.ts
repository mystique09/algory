import { writable, type Writable } from "svelte/store";

export const languages: Writable<string[]> = writable([
	"actionscript",
	"ada",
	"alpine-abuild",
	"ampl",
	"ant-build-system",
	"antlr",
	"apacheconf",
	"apl",
	"apollo-guidance-computer",
	"applescript",
	"arc",
	"arduino",
	"asciidoc",
	"asp",
	"aspectj",
	"assembly",
	"ats",
	"augeas",
	"autohotkey",
	"autoit",
	"awk",
	"batchfile",
	"blade",
	"brainfuck",
	"c",
	"c#",
	"c++",
	"c-objdump",
	"c2hs-haskell",
	"cap'n-proto",
	"cartocss",
	"clojure",
	"cmake",
	"cobol",
	"coffeescript",
	"coldfusion",
	"coldfusion-cfc",
	"collada",
	"common-lisp",
	"component-pascal",
	"cool",
	"coq",
	"cpp-objdump",
	"creole",
	"crystal",
	"cson",
	"csound",
	"csound-document",
	"csound-score",
	"css",
	"csv",
	"gherkin",
	"cuda",
	"cycript",
	"cython",
	"d",
	"d-objdump",
	"darcs-patch",
	"dart",
	"desktop",
	"diff",
	"digital-command-language",
	"dm",
	"dns-zone",
	"dockerfile",
	"dogescript",
	"eclipse",
	"ejs",
	"elixir",
	"elm",
	"emacs-lisp",
	"emberscript",
	"eq",
	"erlang",
	"f#",
	"filterscript",
	"fish",
	"flux",
	"forth",
	"fortran",
	"g-code",
	"gdb",
	"gdscript",
	"gentoo-ebuild",
	"gentoo-eclass",
	"gettext-catalog",
	"gherkin",
	"glsl",
	"glyph",
	"gnuplot",
	"go",
	"golo",
	"gosu",
	"grace",
	"gradle",
	"grammatical-framework",
	"graph-modeling-language",
	"graphql",
	"graphviz-(dot)",
	"groovy",
	"groovy-server-pages",
	"hack",
	"haml",
	"handlebars",
	"harbour",
	"haskell",
	"haxe",
	"hcl",
	"hlsl",
	"html",
	"html+django",
	"html+ecr",
	"html+eex",
	"html+erb",
	"html+php",
	"http",
	"hyphy",
	"jasmin",
	"java",
	"java-server-pages",
	"javascript",
	"json",
	"json5",
	"jsx",
	"julia",
	"jupyter-notebook",
	"kicad",
	"kit",
	"kotlin",
	"less",
	"lex",
	"linux-kernel-module",
	"liquid",
	"literate-agda",
	"literate-coffeescript",
	"literate-haskell",
	"llvm",
	"logos",
	"logtalk",
	"lolcode",
	"lookml",
	"loomscript",
	"lsl",
	"lua",
	"m",
	"makefile",
	"mako",
	"markdown",
	"mask",
	"mathematica",
	"matlab",
	"maven-pom",
	"max",
	"maxscript",
	"mediawiki",
	"mercury",
	"meson",
	"metal",
	"minid",
	"mirah",
	"modelica",
	"modula-2",
	"module-management-system",
	"moonscript",
	"newlisp",
	"nginx",
	"nim",
	"ninja",
	"nix",
	"nl",
	"nu",
	"numpy",
	"objdump",
	"objective-c",
	"objective-c++",
	"ocaml",
	"opencl",
	"openedge-abl",
	"openrc-runscript",
	"openscad",
	"opentype-feature-file",
	"org",
	"ox",
	"oxygene",
	"oz",
	"p4",
	"pan",
	"papyrus",
	"pascal",
	"perl",
	"perl6",
	"php",
	"pic",
	"pickle",
	"picolisp",
	"piglatin",
	"plpgsql",
	"plsql",
	"postscript",
	"pov-ray-sdl",
	"powerbuilder",
	"powershell",
	"processing",
	"prolog",
	"propeller-spin",
	"protocol-buffer",
	"public-key",
	"pug",
	"puppet",
	"pure-data",
	"purebasic",
	"purescript",
	"python",
	"python-console",
	"python-traceback",
	"qmake",
	"qml",
	"r",
	"racket",
	"ragel",
	"raml",
	"rascal",
	"raw-token-data",
	"rdoc",
	"realbasic",
	"reason",
	"rebol",
	"red",
	"redcode",
	"ren'py",
	"renderscript",
	"restructuredtext",
	"rexx",
	"rhtml",
	"rmarkdown",
	"robotframework",
	"ruby",
	"rust",
	"sage",
	"saltstack",
	"sas",
	"sass",
	"scala",
	"scaml",
	"scheme",
	"scilab",
	"scss",
	"self",
	"shell",
	"shellsession",
	"slash",
	"slim",
	"smali",
	"smalltalk",
	"smarty",
	"smt",
	"sourcepawn",
	"sparql",
	"spline-font-database",
	"sqf",
	"sql",
	"sqlpl",
	"squirrel",
	"srecode-template",
	"stan",
	"standard-ml",
	"stata",
	"ston",
	"stylus",
	"sublime-text-config",
	"subrip-text",
	"supercollider",
	"svg",
	"swift",
	"systemverilog",
	"tcl",
	"tcsh",
	"tea",
	"terra",
	"tex",
	"text",
	"textile",
	"thrift",
	"ti-program",
	"tla",
	"toml",
	"turing",
	"turtle",
	"twig",
	"txl",
	"typescript",
	"unified-parallel-c",
	"unity3d-asset",
	"unix-assembly",
	"uno",
	"unrealscript",
	"urweb",
	"vala",
	"vcl",
	"verilog",
	"vhdl",
	"vim-script",
	"vim-script",
	"visual-basic",
	"volt",
	"vue",
	"wavefront-material",
	"wavefront-object",
	"web-ontology-language",
	"webidl",
	"wisp",
	"world-of-warcraft-addon-data",
	"x10",
	"xbase",
	"xc",
	"xcompose",
	"xml",
	"xojo",
	"xpages",
	"xproc",
	"xquery",
	"xs",
	"xslt",
	"xtend",
	"yacc",
	"yaml",
	"yang",
	"zephir",
	"zimpl",
]);
