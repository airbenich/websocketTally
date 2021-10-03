# Websocket Tally


## To Use

To clone and run this repository you'll need to run these commands from your command line:

```bash
# Clone this repository
git clone https://github.com/airbenich/websocketTally
# Go into the repository
cd websocketTally
# install libusb
sudp apt-get install libusb
# Install dependencies
npm install
# Run the app
npm start 
```

## Put into autostart in raspbian buster
```bash
sudo nano /etc/rc.local
```
Put in this file the following content before exit 0:
```bash
su -c "screen -smS websocketTally sh -c 'npm start --prefix /home/pi/websocketTally/; exec bash'" pi
```

## Add usb device to group so that it can be used without sudo

The device info can be found from the following:
```bash
$ lsusb
> Bus 001 Device 008: ID 0b67:555e Fairbanks Scales SCB-R9000
```
```bash
$ lsusb -vvv // has more detailed output
```
```bash
sudo vi /etc/udev/rules.d/50-usb-scale.rules
```
```bash
SUBSYSTEM=="input", GROUP="input", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0b67", ATTRS{idProduct}=="555e", MODE:="666", GROUP="plugdev"
KERNEL=="hidraw*", ATTRS{idVendor}=="0b67", ATTRS{idProduct}=="555e", MODE="0666", GROUP="plugdev"
```
save and then sudo udevadm control --reload-rules && sudo udevadm trigger

Save the file and reboot.

## License

[GPL 3.0 (General Public Licence)](LICENSE.md)