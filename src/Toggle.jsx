

export default function Toggle(props) {

    const { onCheckboxChange } = props

    return (
        <>
            <label className="switch">
                <input type="checkbox" onChange={onCheckboxChange}></input>
                <span className="slider round"></span>
            </label>
        </>
    )
};