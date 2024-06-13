// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { FormEvent, useEffect } from 'react';
import { useSelector, useDispatch } from 'src/store/Store';
import { IconButton, InputBase, Box, Popover } from '@mui/material';
import Picker, { EmojiClickData } from 'emoji-picker-react';
import { IconMoodSmile, IconPaperclip, IconPhoto, IconSend } from '@tabler/icons-react';
import { sendMsg } from 'src/store/financial-consultant/ConsultSlice';
import useAuth from 'src/guards/authGuard/UseAuth';

const ChatMsgSent = () => {
  const [msg, setMsg] = React.useState<string>('');
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [chosenEmoji, setChosenEmoji] = React.useState<EmojiClickData>();
  const auth = useAuth();

  const onEmojiClick = (emojiObject: EmojiClickData) => {
    setChosenEmoji(emojiObject);
    setMsg(emojiObject.emoji);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const id = useSelector((state) => state.financialConsultantReducer.chattingWith);

  const handleChatMsgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
  };

  const newMsg = { id, msg };

  const onChatMsgSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    auth.socket?.emit('client_message', newMsg);
    dispatch(sendMsg(newMsg));
    setMsg('');
  };

  return (
    <Box p={2}>
      {/* ------------------------------------------- */}
      {/* sent chat */}
      {/* ------------------------------------------- */}
      <form
        onSubmit={onChatMsgSubmit}
        style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
      >
        {/* ------------------------------------------- */}
        {/* Emoji picker */}
        {/* ------------------------------------------- */}
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls="long-menu"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <IconMoodSmile />
        </IconButton>
        <Popover
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Picker onEmojiClick={onEmojiClick} />
          <Box p={2}>Selected: {chosenEmoji ? chosenEmoji.emoji : ''}</Box>
        </Popover>
        <InputBase
          id="msg-sent"
          fullWidth
          value={msg}
          placeholder="Type a Message"
          size="small"
          type="text"
          inputProps={{ 'aria-label': 'Type a Message' }}
          onChange={handleChatMsgChange.bind(null)}
        />
        <IconButton
          aria-label="delete"
          onClick={() => {
            dispatch(sendMsg(newMsg));
            setMsg('');
          }}
          disabled={!msg}
          color="primary"
        >
          <IconSend stroke={1.5} size="20" />
        </IconButton>
        <IconButton aria-label="delete">
          <IconPhoto stroke={1.5} size="20" />
        </IconButton>
        <IconButton aria-label="delete">
          <IconPaperclip stroke={1.5} size="20" />
        </IconButton>
      </form>
    </Box>
  );
};

export default ChatMsgSent;
