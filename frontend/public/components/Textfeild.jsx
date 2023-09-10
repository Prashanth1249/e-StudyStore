import { Stack,TextField } from "@mui/material";
function MuiTextField()
{
    return(
        <Stack direction="rows">
            <Stack spacing={4}>
                <TextField label='name'/>
            </Stack>
        </Stack>
    )
}
export default MuiTextField
