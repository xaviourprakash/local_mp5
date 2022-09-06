export const mockOutputAudioProps = {
  element: {
    field_options: {
      break_line: true,
      number_of_columns: 12,
      label: "",
      keep_on_previous_page: true,
      must_be_consumed: true,
      audio_link: "",
      show_in_nodes: {
        mp_df_mobile_validate: "true",
        mp_df_mobile_edit: "true",
        mp_df_mobile_create: "true",
      },
    },
    type: "output_audio",
    is_mandatory: false,
    is_output: false,
    source: "data",
    group: "non_input",
    slug: "setmg8_unnamed_audiooutput",
    previous_types: {
      output: "output_audio",
      input: "output_audio",
    },
    id: null,
    internalId: 3,
  },
  dataFields: [
    {
      label: "ID (Number of Tasks)",
      value: "id_number_of_tasks_",
      selectedValue: "{{id_number_of_tasks_}}",
    },
    {
      label: "Link - Example Video",
      value: "link_example_video",
      selectedValue: "{{link_example_video}}",
    },
  ],
  nodesData: [
    "mp_df_mobile_validate",
    "mp_df_mobile_edit",
    "mp_df_mobile_create",
  ],
};
