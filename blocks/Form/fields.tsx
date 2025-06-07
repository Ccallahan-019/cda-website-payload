import { Checkbox } from "./fields/Checkbox";
import { Country } from "./fields/country/Country";
import { Email } from "./fields/Email";
import { Message } from "./fields/Message";
import { Number } from "./fields/Number";
import { Select } from "./fields/Select";
import { State } from "./fields/state/State";
import { Text } from "./fields/Text";
import { TextArea } from "./fields/TextArea";

export const fields = {
  checkbox: Checkbox,
  email: Email,
  text: Text,
  textarea: TextArea,
  select: Select,
  state: State,
  country: Country,
  message: Message,
  number: Number,
};
