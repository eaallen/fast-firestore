import React from 'react'


const DEFAULT_VALUES = [ false, true ]

/**
 * A declarative, simple, zero-dependency, unnecessary-but-really-useful
 * toggle component so you don't need a state variable.
 *
 *      <Toggle
 *          values={['a','b','c']}          // array to toggle through  default: [false, true]
 *          defaultIndex={1}                // initial index            default: 0
 *      >{tog => (
 *          <div>Toggle index is {tog.index}</div>
 *          <div>Toggle value is {tog.value}</div>
 *
 *          <Button onClick={tog.toggle}>Next</Button>
 *      )}</Toggle>
 */
export function Toggle(props) {
    const [ index, setIndex ] = React.useState(props.defaultIndex || 0)
    const values = props.values || DEFAULT_VALUES

    /* Toggles to the next index or to idx if given */
    const toggle = idx => {
        idx = Number.isInteger(idx) ? idx : index+1
        if (idx < 0 || idx >= values.length) {
            idx = 0
        }
        setIndex(idx)
    }

    /** Sets to the index of the given value */
    const setValue = val => {
        const idx = values.indexOf(val)
        if (idx >= 0) {
            toggle(idx)
        }
    }

    /** Context manager that toggles, calls a (async) function, and toggles again */
    const withToggle = async callback => {
        toggle()
        try {
            await callback()
        }finally{
            toggle()
        }
    }

    // call the fuctional component with a state object
    return props.children({
        // current state
        index: index,
        value: values[index],
        // setters
        toggle: toggle,
        setIndex: toggle,       // alias to toggle
        setValue: setValue,
        // context manager
        withToggle: withToggle,
    })
}
