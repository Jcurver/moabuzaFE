import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@material-ui/core'

function AddEvent() {
  return (
    <Dialog open>
      <form>
        <DialogContent>
          <TextField placeholder="Title" />
          <TextField placeholder="Amount" />
        </DialogContent>
        <DialogActions>
          <Button>Add</Button>
          <Button>Cancel</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddEvent
