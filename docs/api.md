## Functions

<dl>
<dt><a href="#Prompt">Prompt()</a></dt>
<dd><p>Constructor</p>
</dd>
<dt><a href="#renderValues">renderValues(choices)</a> ⇒ <code>String</code></dt>
<dd><p>render Values</p>
</dd>
</dl>

<a name="Prompt"></a>

## Prompt()
Constructor

**Kind**: global function  

* [Prompt()](#Prompt)
    * [._run(cb)](#Prompt+_run) ⇒ <code>this</code>
    * [.render()](#Prompt+render) ⇒ <code>[Prompt](#Prompt)</code>
    * [.filterInput()](#Prompt+filterInput)
    * [.filter()](#Prompt+filter)
    * [.onKeypress()](#Prompt+onKeypress)
    * [.onAddKey()](#Prompt+onAddKey)

<a name="Prompt+_run"></a>

### prompt._run(cb) ⇒ <code>this</code>
Start the Inquiry session

**Kind**: instance method of <code>[Prompt](#Prompt)</code>  

| Param | Type | Description |
| --- | --- | --- |
| cb | <code>function</code> | Callback when prompt is done |

<a name="Prompt+render"></a>

### prompt.render() ⇒ <code>[Prompt](#Prompt)</code>
Render the prompt to screen

**Kind**: instance method of <code>[Prompt](#Prompt)</code>  
**Returns**: <code>[Prompt](#Prompt)</code> - self  
<a name="Prompt+filterInput"></a>

### prompt.filterInput()
When user press `enter` key

**Kind**: instance method of <code>[Prompt](#Prompt)</code>  
<a name="Prompt+filter"></a>

### prompt.filter()
Filter fn

**Kind**: instance method of <code>[Prompt](#Prompt)</code>  
<a name="Prompt+onKeypress"></a>

### prompt.onKeypress()
When user press a key

**Kind**: instance method of <code>[Prompt](#Prompt)</code>  
<a name="Prompt+onAddKey"></a>

### prompt.onAddKey()
when user presses arrow down

**Kind**: instance method of <code>[Prompt](#Prompt)</code>  
<a name="renderValues"></a>

## renderValues(choices) ⇒ <code>String</code>
render Values

**Kind**: global function  
**Returns**: <code>String</code> - coontaining Output  

| Param | Type |
| --- | --- |
| choices | <code>Array</code> | 

