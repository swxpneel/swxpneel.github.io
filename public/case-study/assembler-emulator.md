## Problem
Build a full VC407 assembler/emulator that can translate assembly into machine code and execute it.

## Approach
- Implemented a two-pass assembler to resolve symbols and labels before encoding.
- Designed a modular architecture so parsing, encoding, and execution are isolated.
- Built an emulator loop to load machine code and execute instructions.

## Results
- Produced executable machine code and validated behavior with sample programs.
- Made it easier to extend or debug instructions during development.
