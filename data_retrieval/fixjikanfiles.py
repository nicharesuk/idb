import fileinput
import os

replacements = {'&#039;':'\'', '&quot;': '\\\"', '\\&': '&'}

def fix_data(directory):
    for filename in os.listdir(directory):
        read_file = directory + '/' + filename
        lines = []
        with open(read_file) as infile:
            for line in infile:
                for src, target in replacements.iteritems():
                    line = line.replace(src, target)
                lines.append(line)
        with open(read_file, 'w') as outfile:
            for line in lines:
                outfile.write(line)

if __name__ == "__main__":
    fix_data('jikan_anime')
    fix_data('jikan_manga')
    fix_data('jikan_person')
    fix_data('jikan_character')