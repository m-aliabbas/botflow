def lower_and_replace_spaces(input_string):
    # Convert the input string to lowercase
    lowercased_string = input_string.lower()

    # Replace spaces with underscores
    replaced_string = lowercased_string.replace(' ', '_')

    return replaced_string