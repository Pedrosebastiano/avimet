import React, {useEffect, useRef} from 'react';


const ReadModifyInput = React.memo(({autocomplete, shouldFocus, value, design, input_type, input_placeholder, input_id, editing, define_class, onChange }) => {
    const inputRef = useRef(null);
    const hasFocused = useRef(false);

    useEffect(() => {
        if (editing && shouldFocus && inputRef.current && document.activeElement !== inputRef.current) {
            inputRef.current.focus();
            hasFocused.current = true;
        }
    }, [editing, shouldFocus]);

    return (
        <input
            ref={inputRef}
            className={`${define_class} ${design} ${!editing ? 'editable-input' : ''}`}
            type={input_type}
            placeholder={input_placeholder}
            value={value}
            id={input_id}
            onChange={onChange}
            readOnly={!editing}
            autoComplete={autocomplete}
        />
    );
});

export default ReadModifyInput;