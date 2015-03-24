# BEM Constructor

BEM Constructor is a Sass library for building immutable and namespaced BEM-style CSS objects.

By enforcing a consistent and programatic way of defining objects (blocks, elements and modifiers) it ensures a more structured, robust and secure object codebase that is easy to understand and maintain. Objects defined using the constructor are impossible to modify and reassign by mistake or omission.

Jump to [🍔 The Burger Example™](#example) to see the mixins in action.

## Key ideas

The key ideas behind this library are well explained by Harry Roberts in his articles [Immutable CSS](http://csswizardry.com/2015/03/immutable-css/), [More Transparent UI Code with Namespaces](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/) and [MindBEMding – getting your head ’round BEM syntax](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/),

### 1. Immutability

Some CSS objects in your project shouldn't be able to change (mutate). They have a very specific role and you need to make sure they're not reassigned somewhere else in your codebase. In order to ensure immutability you'll need three things: a way of defining those objects, a way of recognising them and a way to guarantee you won't be able to modify them later on. By constructing objects programatically you can be confident that they are assigned once and just once.

### 2. Namespacing

Objects have a clear function. Whether they are components, utilities o dirty hacks, we need a consistent way of telling them apart. By namespacing objects, our UI code becomes more transparent and understandable.  BEM Constructor supports the following object types:

- Objects
- Components
- Utilities
- Themes
- States
- Scopes
- Hacks

Read [Harry's post on namespaces](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/) to get a deep look at why and how they are used.


### 3. BEM structure

BEM objects are composed of a block and any number of elements and/or modifiers. Using the BEM syntax for naming classes you'll produce structured code that helps you and other developers understand at a glance the relationship between those classes. The BEM constructor takes care of generating bem-compliant selectors.

## Installation

There are 3 ways of installing BEM Constructor:

### Download

Download the Sass files in [stylesheets/](/stylesheets/) and place them in your Sass directory.

### Bower

Run the following command:

    bower install --save-dev bem-constructor

### Compass extension

1. `gem install bem-constructor`
2. Add `require 'bem-constructor'` to your `config.rb`

## Usage

Import it into your main stylesheet:

    @import 'bem-constructor';

### block($name, $type)

Constructs a new block element of a given type. `$type` being one of: `'object'`, `'component'` or `'utility'`.

    @include block($name, $type) { ... }


#### object($name)

A shortcut for `block($name, $type: 'object')`

#### component($name)

A shortcut for `block($name, $type: 'component')`

#### utility($name)

A shortcut for `block($name, $type: 'utility')`


### element($name...)

Creates a new element of the parent block. It should always be nested within a block constructor. You can create multiple elements at once by passing a comma separated list (Arglist) of element names.

    @include element($name...) { ... }


### modifier($name...)

Creates a new modifier of the parent block or element. Should always be nested within a block or element constructor. You can declare multiple modifiers at once by passing a comma separated list (Arglist) of modifier names.

    @include modifier($name...) { ... }


### modifies-element($modified-elements...)

When declaring a block modifier, a state you may need to target and modify some of the block elements too. Use the following mixin to scope the ruleset to those elements.

    @include modifies-element($modified-elements...) { ... }


### theme($themes...)

Style your objects given a parent theme class.

    @include theme($themes...) { ... }

### state($states...)

Modifies objects by appending a state class

    @include state($states...) { ... }

### hack()

Signals that the following code is a hack.

    @include hack() { ... }


### scope($name)

Creates a new scope

Scopes allow you to isolate code you don't have control over.

    @include scope($name) { ... }

## Options

### Namespaces

Switch namespaces on/off by setting the following variable:

    $bem-use-namespaces: false; // defaults to true

Override the default block namespaces:

    $bem-block-namespaces: (
        'object': 'obj',     // defaults to 'o'
        'component': 'comp', // defaults to 'c'
        'utility': 'helper', // defaults to 'u'
    );

Override the default theme namespace:

    $bem-theme-namespace: 'theme'; // defaults to 't'

Override the default state namespace:

    $bem-state-namespace: 'has'; // defaults to 'is'

Override the default hack namespace:

    $bem-hack-namespace: 'it-wasnt-me-'; // defaults to '_'



### BEM separators

By default BEM Constructor uses the following BEM convention:
- Two underscores (__) for elements
- Two hyphens for modifiers (--).

You can customize them to whatever fits you needs:

    $bem-element-separator: '-'; // Defaults to '__'

    $bem-modifier-separator: '-_-_'; // Defaults to '--'


##<a name="example"></a> 🍔 The Burger Example™


*Disclaimer: the following Sass code may not compile into a real burger.*

````scss

    @include object('burger') {
        texture: juicy;

        @include element('lettuce', 'tomato') {
            quality: fresh;
        }

        @include element('cheese') {
            type: gouda;

            @include modifier('parmigiano') {
                type: parmigiano;
            }
        }

        @include element('extra-topping') {
            ingredient: bacon;
        }

        @include element('meat') {
            type: beef;
        }

        @include modifier('veggie') {
            texture: smooth;

            @include modifies-element('meat') {
                type: lentils;
            }

            @include modifies-element('extra-topping') {
                ingredient: avocado;

                @include hack() {
                    ingredient: bacon;
                }
            }
        }

        @include theme('mexican') {
            spicy: hell-yeah;
        }

        @include state('cold') {
            taste: terrible;
        }
    }
````

The compiled CSS:

````css

    /* The main Burger object */
    .o-burger { texture: juicy; }

    /* Lettuce and Tomato elements */
    .o-burger__lettuce, .o-burger__tomato { quality: fresh; }

    /* Cheese element */
    .o-burger__cheese { type: gouda; }

    /* Cheese modifier */
    .o-burger__cheese--parmigiano { type: parmigiano; }

    /* Extra topping element */
    .o-burger__extra-topping { ingredient: bacon; }

    /* Meat element */
    .o-burger__meat { type: beef; }

    /* Veggie Burger block modifier */
    .o-burger--veggie { texture: smooth; }

    /* Veggie Burger block modifier modifies the Meat element too */
    .o-burger--veggie .o-burger__meat { type: lentils; }

    /* Veggie Burger block modifier modifies the Extra Topping element too */
    .o-burger--veggie .o-burger__extra-topping { ingredient: avocado; }

    /* But as hackers we couldn't resist the urge to add some Bacon back */
    ._o-burger--veggie .o-burger__extra-topping { ingredient: bacon; }

    /* When the party Theme is Mexican, we make everything spicy */
    .t-mexican .o-burger { spicy: hell-yeah; }

    /* And we're all sad when a burger Is Cold */
    .o-burger.is-cold { taste: terrible; }
````

## This is overkill, who is this for?

If constructing objects programatically seems too verbose or abstract to you that's perfectly OK. This tool is not for everybody. However if you need to enforce a strict way of writing BEM objects in your project, want to make sure they won't mutate and thus produce more secure CSS, then this tool might help you.
