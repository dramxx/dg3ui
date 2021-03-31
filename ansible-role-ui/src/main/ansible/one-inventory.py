#!/usr/bin/env python
import json
import argparse

jsondata = json.loads(open('../../../../../inf/terraform-dg3-build-infra/terraform.tfstate').read())
jsonout = {
    "ansible_role_jenkins_slave_builder_hosts": {
        "hosts": [
        ],
        "vars": {
            "ansible_connection": "ssh",
            "ansible_ssh_user": "solman",
            # "ansible_ssh_private_key_file": "~/.ssh/devel-virtual",
            "ansible_ssh_pass": "MyMi147258",
            "ansible_python_interpreter": "/usr/bin/python3"
        }
    },
    "deploy_hosts": {
        "hosts": [
        ],
        "vars": {
            "ansible_connection": "ssh",
            "ansible_ssh_user": "solman",
            # "ansible_ssh_private_key_file": "~/.ssh/devel-virtual",
            "ansible_ssh_pass": "MyMi147258",
            "ansible_python_interpreter": "/usr/bin/python3"
        }
    },
    "_meta": {
        "hostvars": {
        }
    }
}

for resource in jsondata['resources']:
    for instance in resource["instances"]:
        if "jenkins-build-slave-vm" in instance['attributes']['name']:
            jsonout["ansible_role_jenkins_slave_builder_hosts"]["hosts"].append(instance['attributes']['ip'])
            jsonout["_meta"]["hostvars"][instance['attributes']['ip']] = {}
        elif "dg3-deploy-vm" in instance['attributes']['name']:
            jsonout["deploy_hosts"]["hosts"].append(instance['attributes']['ip'])
            jsonout["_meta"]["hostvars"][instance['attributes']['ip']] = {}

def get_json_out():
    return jsonout

parser = argparse.ArgumentParser()
parser.add_argument('--list', action='store_true')
# TODO: Implement, not used yet.
parser.add_argument('--host', action='store')
args = parser.parse_args()

# Called with `--list`.
if args.list:
    get_json_out()

print(json.dumps(get_json_out(), indent=2, sort_keys=False))
