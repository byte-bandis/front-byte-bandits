import Form from 'react-bootstrap/Form'
import p from 'prop-types'

const MultiSelect = ({handleOptions}) => {

  return (
    
    <Form.Group className='mb-3'>
      <Form.Label htmlFor='multiple-select-tags'>Tags</Form.Label>
      <Form.Select
        aria-label='Default select example'
        id='multiple-select-tags'
        multiple
        onChange={handleOptions}
      >
       
            <option key={1} value='opcion1'>
              Option 1
            </option>
          
      </Form.Select>
    </Form.Group>
  )
}

MultiSelect.propTypes = {
	handleOptions: p.func.isRequired
}


export default MultiSelect
