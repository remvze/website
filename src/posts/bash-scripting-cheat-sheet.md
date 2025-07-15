---
title: 'Bash Scripting Cheat Sheet'
publishDate: '2025-07-15'
updateDate: '2025-07-15'
tags: ['cheatsheet', 'bash-scripting']
---

## The Basics

```bash
#!/bin/bash

# ^ Bash scripts should start with a shebang

# < Comments start with `#` symbol
# Comments are ignored by Bash

# Commands can be separated by new lines:
echo "First Command"
echo "Second Command"

# Or using semicolons in the same line:
echo "Third Command"; echo "Fourth Command"

# You can either run the bash script using the bash command:
bash ./script.sh

# Or by making it an executable:
chmod +x ./script.sh
./script.sh
```

---

## Variables

```bash
# Variables are used to store data

# This is the syntax for declaring variables:
variable_name="value"

# No spaces around the equals sign:
var_one="value one"   # < Correct
var_two = "value two" # < Incorrect
# ^ That's because Bash interprets spaces as argument delimiters. This will throw a command-not-found error.

# You can access a variable by prefixing it with `$`:
name="John"
echo "Hello, $name"    # => Hello, John
echo "Hello, ${name}!" # => Hello, John!

# It's best practice to wrap variables in double quotes to prevent word splitting and glob expansion:
filename="My File.txt"
echo "$filename"    # Correct
echo $filename      # Risky: expands to `My` and `File.txt`, breaking commands like `rm $filename`

# Using single quotes won't expand the variable:
echo 'Hello, $name' # => Hello, $name

# Local variables are scoped to the block in which they are used:
greet() {
  local name="John"
  echo "Hello, ${name}!"
}
greet # => Hello, John!

# You can declare constants using `readonly`
# These variables can't be changed:
readonly version="0.0.1"
# or
declare -r pi=3.14
```

---

## Data Types

```bash
name="Alice" # String
age=25 # Number

# Arrays:
friends=("John" "Bob")
friends[2]="Alex"
echo "${friends[0]}" # => John

# Associative Arrays:
# (Requires Bash 4.0+)
declare -A ages
ages[john]=23
ages[bob]=22
echo "John is ${ages[john]} years old" # => John is 23 years old
```

---

## Conditional Flow

```bash
# if statement:
age=22
if [[ "$age" -gt 18 ]]; then
  echo "You are old enough to enter"
fi

# if/else statements:
age=16
if [[ "$age" -gt 18 ]]; then
  echo "You are old enough to enter"
else
  echo "You are not old enough to enter"
fi

# if/elif/else statements:
username="admin"
if [[ "$username" == "admin" ]]; then
  echo "You are the admin"
elif [[ "$username" == "contributor" ]]; then
  echo "You are a contributor"
else
  echo "Unknown user"
fi

# You can nest if statements:
username="admin"
password="secret-password"
if [[ "$username" == "admin" ]]; then
  if [[ "$password" == "secret-password" ]]; then
    echo "You are the admin"
  fi
fi

# You can also use || (or) and && (and):
username="admin"
password="secret-password"
if [[ "$username" == "admin" ]] && [[ "$password" == "secret-password" ]]; then
  echo "You are the admin"
else
  echo "You are not the admin"
fi
```

### Conditional Operators

```bash
# String Comparison:
# [[ "$a" == "$b" ]]     # Equal
# [[ "$a" != "$b" ]]     # Not equal
# [[ -z "$a" ]]          # String is empty
# [[ -n "$a" ]]          # String is not empty

# Numeric Comparison:
# [[ $a -eq $b ]]        # Equal
# [[ $a -ne $b ]]        # Not equal
# [[ $a -lt $b ]]        # Less than
# [[ $a -le $b ]]        # Less than or equal
# [[ $a -gt $b ]]        # Greater than
# [[ $a -ge $b ]]        # Greater than or equal

# File Test Operators:
# [[ -e file.txt ]]      # File exists
# [[ -f file.txt ]]      # Is a regular file
# [[ -d dir ]]           # Is a directory
# [[ -r file.txt ]]      # File is readable
# [[ -w file.txt ]]      # File is writable
# [[ -x script.sh ]]     # File is executable
# [[ -s file.txt ]]      # File is not empty

# Logical Operators:
# [[ $a -gt 0 && $b -gt 0 ]]  # AND
# [[ $a -gt 0 || $b -gt 0 ]]  # OR
# [[ ! -e file.txt ]]         # NOT
```

---

## Case Statement

```bash
# The `case` statement allows branching based on pattern matching

read -p "Enter a letter: " letter

case "$letter" in
  [a-z])
    echo "You entered a lowercase letter"
    ;;
  [A-Z])
    echo "You entered an uppercase letter"
    ;;
  [0-9])
    echo "You entered a digit"
    ;;
  *)
    echo "You entered something else"
    ;;
esac

# Another example with strings:
read -p "Enter a command (start/stop/restart): " cmd

case "$cmd" in
  start)
    echo "Starting service..."
    ;;
  stop)
    echo "Stopping service..."
    ;;
  restart)
    echo "Restarting service..."
    ;;
  *)
    echo "Unknown command: $cmd"
    ;;
esac

# Patterns can include wildcards:
filename="document.txt"
case "$filename" in
  *.txt) echo "Text file" ;;
  *.jpg|*.png) echo "Image file" ;;
  *) echo "Other file type" ;;
esac
```

---

## Loops

```bash
# For loops allow you to go through a list or range:
for i in {10..15}; do
  echo "i: ${i}"
done

# Alternative syntax for portability:
for ((i=10; i<=15; i++)); do
  echo "i: ${i}"
done

# While loops allow you to loop as long as a condition is true:
i=0
while [[ "$i" -lt 5 ]]; do
  echo "i: ${i}"
  ((i++))
done

# Until loops run until the condition becomes true (opposite of while):
i=5
until [[ "$i" -eq 0 ]]; do
  echo "i: ${i}"
  ((i--))
done

# `break` exits the entire loop early:
i=5
while true; do
  echo "i: ${i}"
  ((i--))

  if [[ "$i" -eq 0 ]]; then
    break
  fi
done

# `continue` skips the rest of the current iteration and continues with the next:
for i in {1..20}; do
  if [[ $(($i % 2)) -eq 1 ]]; then
    continue
  fi

  echo "i: ${i}"
done

# You can also nest loops:
for i in {1..5}; do
  for j in {5..10}; do
    echo "i: ${i}; j: ${j}"
  done
done
```

---

## Arrays

```bash
# Arrays are used to store multiple values in a single variable

# Declare an indexed array:
fruits=("apple" "banana" "cherry")

# Access individual elements (zero-based indexing):
echo "${fruits[0]}"  # => apple
echo "${fruits[1]}"  # => banana

# Add or update elements:
fruits[3]="date"

# Print all elements:
echo "${fruits[@]}"    # => apple banana cherry date
echo "${fruits[*]}"    # => apple banana cherry date

# Get array length:
echo "${#fruits[@]}"   # => 4

# Loop through an array:
for fruit in "${fruits[@]}"; do
  echo "Fruit: $fruit"
done

# Get all indices:
echo "${!fruits[@]}"   # => 0 1 2 3

# Remove an element:
unset 'fruits[1]'      # removes "banana"
echo "${fruits[@]}"    # => apple cherry date

# Declare an associative array (Bash 4.0+):
declare -A capitals
capitals[France]="Paris"
capitals[Germany]="Berlin"

# Access associative array elements:
echo "${capitals[France]}" # => Paris

# Loop through keys:
for country in "${!capitals[@]}"; do
  echo "$country: ${capitals[$country]}"
done

# Print all values:
echo "${capitals[@]}"
```

---

## Functions

```bash
# Functions let you group reusable blocks of code
say_hello() {
  echo "Hello!"
}

say_hello # => Hello!

# A different syntax:
function say_hi() {
  echo "Hi!"
}

say_hi # => "Hi!"

# Functions can accept arguments (as $1, $2, ...):
greet() {
  echo "Hello, ${1}!"
}

greet "Alice" # => Hello, Alice!


# You can check for the number of arguments:
print_info() {
  echo "Script called with $# arguments"
}

print_info one two # => Script called with 2 arguments

# Local variables:
example() {
  local msg="This is local"
  echo "$msg"
}

example # => This is local

# Returning a value using echo and capturing it:
add() {
  echo $(($1 + $2))
}

sum=$(add 3 5)
echo "Sum: $sum" # => Sum: 8

# Returning an exit status (0 = success, non-zero = failure):
is_even() {
  if (( $1 % 2 == 0 )); then
    return 0  # true
  else
    return 1  # false
  fi
}

is_even 4
if [[ $? -eq 0 ]]; then
  echo "Number is even"
else
  echo "Number is odd"
fi
```

---

## Special Variables

```bash
# $0   – The name of the script
# $1   – First argument
# $2   – Second argument, etc.
# $#   – Number of arguments
# $@   – All arguments as separate words
# $*   – All arguments as a single word
# $?   – Exit status of the last command
# $$   – Process ID of the current script
# $!   – PID of the last background command
```

---

## Input

```bash
# The `read` command is used to take user input

# Basic usage:
read name
echo "Hello, $name"

# Prompting the user with -p:
read -p "Enter your name: " name
echo "Hello, $name"

# Reading multiple variables in one line:
read first last
echo "First: $first, Last: $last"

# Using -s to hide input (e.g., for passwords):
read -s -p "Enter password: " password
echo
echo "Password received"

# Using -n to limit number of characters:
read -n 1 -p "Continue? (y/n): " choice
echo "You entered: $choice"

# With a timeout using -t (in seconds):
read -t 5 -p "Enter something in 5 seconds: " input
echo "You typed: $input"
```

---

## Error Handling

```bash
# Check if a command succeeded using if:
if cp file.txt backup.txt; then
  echo "Backup succeeded"
else
  echo "Backup failed"
fi

# Exit the script immediately if a command fails:
set -e

# You can disable `set -e` using:
set +e

# You can also set a custom exit code:
if [[ ! -f "config.yaml" ]]; then
  echo "Missing config file"
  exit 1
fi

# Catch failures using ||:
mkdir new_folder || echo "Failed to create folder"

# Exit script on undefined variable usage (good for strict mode):
set -u
echo "$undefined_var" # Will cause an error and exit
```

---

## Command Substitution

```bash
# Command substitution lets you capture the output of a command into a variable

# Using $(command)
current_date=$(date)
echo "Today is: $current_date"

# Nesting substitutions:
echo "Files in current directory: $(ls | wc -l)"

# Capturing multiline output:
list=$(ls -1)
echo "File list:"
echo "$list"

# Backticks are also supported but not recommended:
hostname=`hostname`  # Use $(hostname) instead
```

---

## Debugging Tips

```bash
# Use `set -x` to print commands as they are executed:
set -x
echo "Debugging this line"
set +x

# Use `trap` to handle script exits and errors:
trap 'echo "An error occurred on line $LINENO"' ERR

# Display line number on error:
trap 'echo "Error on line $LINENO"; exit 1' ERR

# Print current line number manually:
echo "Current line: $LINENO"

# Use `bash -x` to debug a script when running it:
bash -x script.sh

# Dry-run with `-n` (no exec):
bash -n script.sh  # Check for syntax errors without running the script
```
